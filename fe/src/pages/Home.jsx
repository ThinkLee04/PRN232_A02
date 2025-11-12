import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { newsService } from '../services/newsService';
import { categoryService } from '../services/categoryService';
import { toast } from 'react-toastify';
import { FaSearch, FaCalendar, FaUser, FaFolder, FaTags } from 'react-icons/fa';
import { formatDate, truncateText } from '../utils/helpers';
import LoadingSpinner from '../components/LoadingSpinner';

const Home = () => {
  const [news, setNews] = useState([]);
  const [filteredNews, setFilteredNews] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filterNews();
  }, [searchTerm, selectedCategory, news]);

  const fetchData = async () => {
    try {
      const [newsResponse, categoriesResponse] = await Promise.all([
        newsService.getAllNews(),
        categoryService.getAllCategories(),
      ]);

      // Filter only active news (status = 1)
      const activeNews = newsResponse.data.filter(item => item.newsStatus === 1);
      setNews(activeNews);
      setFilteredNews(activeNews);
      setCategories(categoriesResponse.data);
    } catch (error) {
      toast.error('Failed to load news');
    } finally {
      setLoading(false);
    }
  };

  const filterNews = () => {
    let filtered = news;

    if (searchTerm) {
      filtered = filtered.filter(
        (item) =>
          item.newsTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.newsContent.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter((item) => item.categoryId === parseInt(selectedCategory));
    }

    setFilteredNews(filtered);
  };

  if (loading) {
    return <LoadingSpinner fullScreen />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Latest News</h1>
        
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search news..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Categories</option>
            {categories.map((category) => (
              <option key={category.categoryId} value={category.categoryId}>
                {category.categoryName}
              </option>
            ))}
          </select>
        </div>

        <p className="text-gray-600">
          Found {filteredNews.length} article{filteredNews.length !== 1 ? 's' : ''}
        </p>
      </div>

      {filteredNews.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-500">No news articles found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNews.map((item) => (
            <Link
              key={item.newsArticleId}
              to={`/news/${item.newsArticleId}`}
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">
                    <FaFolder className="inline mr-1" />
                    {item.categoryName}
                  </span>
                </div>

                <h2 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2 hover:text-blue-600">
                  {item.newsTitle}
                </h2>

                {item.headline && (
                  <p className="text-gray-600 mb-4 line-clamp-2">{item.headline}</p>
                )}

                <div className="border-t pt-4 space-y-2 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <FaUser />
                    <span>{item.createdByName}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaCalendar />
                    <span>{formatDate(item.createdDate)}</span>
                  </div>
                  {item.tags && item.tags.length > 0 && (
                    <div className="flex items-start gap-2">
                      <FaTags className="mt-1" />
                      <div className="flex flex-wrap gap-1">
                        {item.tags.map((tag) => (
                          <span
                            key={tag.tagId}
                            className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
                          >
                            {tag.tagName}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
