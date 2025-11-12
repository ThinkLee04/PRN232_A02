using Microsoft.EntityFrameworkCore;
using Model.Entities;
using Repository.Interfaces;

namespace Repository.Implements
{
    public class TagRepo : GenericRepo<Tag>, ITagRepo
    {
        public TagRepo(DbContext context) : base(context)
        {
        }

        public async Task<List<Tag>> GetTagsByIdsAsync(List<int> tagIds)
        {
            return await _dbSet
                .Where(t => tagIds.Contains(t.TagId))
                .ToListAsync();
        }
    }
}
