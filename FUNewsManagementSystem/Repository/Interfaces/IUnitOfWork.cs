namespace Repository.Interfaces
{
    public interface IUnitOfWork : IDisposable
    {
        IAccountRepo AccountRepo { get; }
        ICategoryRepo CategoryRepo { get; }
        INewsArticleRepo NewsArticleRepo { get; }
        ITagRepo TagRepo { get; }
    }
}
