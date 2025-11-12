using Microsoft.EntityFrameworkCore;
using Model.Entities;
using Repository.Interfaces;

namespace Repository.Implements
{
    public class CategoryRepo : GenericRepo<Category>, ICategoryRepo
    {
        public CategoryRepo(DbContext context) : base(context)
        {
        }

        public async Task<Category?> GetCategoryWithNewsArticlesAsync(int categoryId)
        {
            return await _dbSet
                .Include(c => c.NewsArticles)
                .FirstOrDefaultAsync(c => c.CategoryId == categoryId);
        }

        public async Task<Category?> GetCategoryWithParentAsync(int categoryId)
        {
            return await _dbSet
                .Include(c => c.ParentCategory)
                .FirstOrDefaultAsync(c => c.CategoryId == categoryId);
        }

        public async Task<List<Category>> GetAllWithParentAsync()
        {
            return await _dbSet
                .Include(c => c.ParentCategory)
                .ToListAsync();
        }
    }
}
