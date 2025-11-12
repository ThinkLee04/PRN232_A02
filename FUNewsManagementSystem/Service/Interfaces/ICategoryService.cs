using Model.DTOs;

namespace Service.Interfaces
{
    public interface ICategoryService
    {
        Task<APIResponse<List<CategoryResponse>>> GetAllCategoriesAsync(bool activeOnly = true);
        Task<APIResponse<CategoryResponse>> GetCategoryDetailAsync(int categoryId);
        Task<APIResponse<CategoryResponse>> CreateCategoryAsync(CreateCategoryRequest request);
        Task<APIResponse<CategoryResponse>> UpdateCategoryAsync(int categoryId, UpdateCategoryRequest request);
        Task<APIResponse<string>> DeleteCategoryAsync(int categoryId);
    }
}
