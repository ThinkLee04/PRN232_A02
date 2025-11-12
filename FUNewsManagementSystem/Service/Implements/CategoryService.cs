using Repository.Interfaces;
using Service.Interfaces;
using Model.DTOs;
using Model.Entities;

namespace Service.Implements
{
    public class CategoryService : ICategoryService
    {
        private readonly IUnitOfWork _uow;

        public CategoryService(IUnitOfWork unitOfWork)
        {
            _uow = unitOfWork;
        }

        public async Task<APIResponse<List<CategoryResponse>>> GetAllCategoriesAsync(bool activeOnly = true)
        {
            try
            {
                var allCategories = await _uow.CategoryRepo.GetAllWithParentAsync();
                
                // Filter theo activeOnly
                IEnumerable<Category> categories;
                if (activeOnly)
                {
                    // Chỉ lấy categories active và có parent active (hoặc không có parent)
                    categories = allCategories.Where(c => c.IsActive && (c.ParentCategory == null || c.ParentCategory.IsActive));
                }
                else
                {
                    // Lấy tất cả (cả active và inactive)
                    categories = allCategories;
                }
                    
                var categoryResponses = categories.Select(c => new CategoryResponse
                {
                    CategoryId = c.CategoryId,
                    CategoryName = c.CategoryName,
                    CategoryDescription = c.CategoryDescription,
                    ParentCategoryId = c.ParentCategoryId,
                    ParentCategoryName = c.ParentCategory?.CategoryName,
                    IsActive = c.IsActive
                }).ToList();

                return APIResponse<List<CategoryResponse>>.Ok(categoryResponses, "Categories retrieved successfully", "200");
            }
            catch (Exception ex)
            {
                return APIResponse<List<CategoryResponse>>.Fail($"Error retrieving categories: {ex.Message}", "500");
            }
        }

        public async Task<APIResponse<CategoryResponse>> GetCategoryDetailAsync(int categoryId)
        {
            try
            {
                var category = await _uow.CategoryRepo.GetCategoryWithParentAsync(categoryId);
                if (category == null || !category.IsActive)
                {
                    return APIResponse<CategoryResponse>.Fail("Category not found", "404");
                }

                var categoryResponse = new CategoryResponse
                {
                    CategoryId = category.CategoryId,
                    CategoryName = category.CategoryName,
                    CategoryDescription = category.CategoryDescription,
                    ParentCategoryId = category.ParentCategoryId,
                    ParentCategoryName = category.ParentCategory?.CategoryName,
                    IsActive = category.IsActive
                };

                return APIResponse<CategoryResponse>.Ok(categoryResponse, "Category retrieved successfully", "200");
            }
            catch (Exception ex)
            {
                return APIResponse<CategoryResponse>.Fail($"Error retrieving category: {ex.Message}", "500");
            }
        }

        public async Task<APIResponse<CategoryResponse>> CreateCategoryAsync(CreateCategoryRequest request)
        {
            try
            {
                // Kiểm tra parent category nếu có
                if (request.ParentCategoryId.HasValue)
                {
                    var parentCategory = await _uow.CategoryRepo.GetByIdAsync(request.ParentCategoryId.Value);
                    if (parentCategory == null)
                    {
                        return APIResponse<CategoryResponse>.Fail("Parent category not found", "404");
                    }
                }

                var newCategory = new Category
                {
                    CategoryName = request.CategoryName,
                    CategoryDescription = request.CategoryDescription,
                    ParentCategoryId = request.ParentCategoryId,
                    IsActive = request.IsActive
                };

                await _uow.CategoryRepo.CreateAsync(newCategory);

                var categoryResponse = new CategoryResponse
                {
                    CategoryId = newCategory.CategoryId,
                    CategoryName = newCategory.CategoryName,
                    CategoryDescription = newCategory.CategoryDescription,
                    ParentCategoryId = newCategory.ParentCategoryId,
                    IsActive = newCategory.IsActive
                };

                return APIResponse<CategoryResponse>.Ok(categoryResponse, "Category created successfully", "201");
            }
            catch (Exception ex)
            {
                return APIResponse<CategoryResponse>.Fail($"Error creating category: {ex.Message}", "500");
            }
        }

        public async Task<APIResponse<CategoryResponse>> UpdateCategoryAsync(int categoryId, UpdateCategoryRequest request)
        {
            try
            {
                var category = await _uow.CategoryRepo.GetByIdAsync(categoryId);
                if (category == null)
                {
                    return APIResponse<CategoryResponse>.Fail("Category not found", "404");
                }

                // Kiểm tra parent category nếu có
                if (request.ParentCategoryId.HasValue)
                {
                    // Không cho phép category là parent của chính nó
                    if (request.ParentCategoryId.Value == categoryId)
                    {
                        return APIResponse<CategoryResponse>.Fail("Category cannot be parent of itself", "400");
                    }

                    var parentCategory = await _uow.CategoryRepo.GetByIdAsync(request.ParentCategoryId.Value);
                    if (parentCategory == null)
                    {
                        return APIResponse<CategoryResponse>.Fail("Parent category not found", "404");
                    }
                }

                category.CategoryName = request.CategoryName;
                category.CategoryDescription = request.CategoryDescription;
                category.ParentCategoryId = request.ParentCategoryId;
                // IsActive không được update qua API Update, chỉ update qua Delete (soft delete)

                await _uow.CategoryRepo.UpdateAsync(category);

                // Reload category from database to get updated values
                var updatedCategory = await _uow.CategoryRepo.GetByIdAsync(categoryId);

                var categoryResponse = new CategoryResponse
                {
                    CategoryId = updatedCategory!.CategoryId,
                    CategoryName = updatedCategory.CategoryName,
                    CategoryDescription = updatedCategory.CategoryDescription,
                    ParentCategoryId = updatedCategory.ParentCategoryId,
                    IsActive = updatedCategory.IsActive
                };

                return APIResponse<CategoryResponse>.Ok(categoryResponse, "Category updated successfully", "200");
            }
            catch (Exception ex)
            {
                return APIResponse<CategoryResponse>.Fail($"Error updating category: {ex.Message}", "500");
            }
        }

        public async Task<APIResponse<string>> DeleteCategoryAsync(int categoryId)
        {
            try
            {
                var category = await _uow.CategoryRepo.GetByIdAsync(categoryId);
                if (category == null || !category.IsActive)
                {
                    return APIResponse<string>.Fail("Category not found", "404");
                }

                // Danh sách các categoryId cần inactive (bao gồm cả category cha và con)
                var categoryIdsToInactive = new List<int> { categoryId };

                // Soft delete category cha
                category.IsActive = false;
                await _uow.CategoryRepo.UpdateAsync(category);

                // Lấy tất cả categories để tìm category con
                var allCategories = await _uow.CategoryRepo.GetAllAsync();
                
                // Tìm tất cả category con (ParentCategoryId = categoryId)
                var childCategories = allCategories.Where(c => c.ParentCategoryId == categoryId && c.IsActive).ToList();
                
                // Inactive tất cả category con và collect IDs
                foreach (var child in childCategories)
                {
                    child.IsActive = false;
                    await _uow.CategoryRepo.UpdateAsync(child);
                    categoryIdsToInactive.Add(child.CategoryId);
                }

                // Lấy tất cả news thuộc các categories bị inactive
                var allNews = await _uow.NewsArticleRepo.GetAllNewsArticlesWithDetailsAsync();
                var newsToInactive = allNews.Where(n => categoryIdsToInactive.Contains(n.CategoryId) && n.NewsStatus == 1).ToList();

                // Inactive tất cả news liên quan
                foreach (var news in newsToInactive)
                {
                    news.NewsStatus = 0; // Set to Inactive
                    await _uow.NewsArticleRepo.UpdateAsync(news);
                }

                var message = childCategories.Any() || newsToInactive.Any()
                    ? $"Category deleted with {childCategories.Count} child category(ies) and {newsToInactive.Count} news article(s) inactivated"
                    : "Category deleted successfully";

                return APIResponse<string>.Ok(message, message, "200");
            }
            catch (Exception ex)
            {
                return APIResponse<string>.Fail($"Error deleting category: {ex.Message}", "500");
            }
        }
    }
}
