import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { newsService } from '../../services/newsService';
import { toast } from 'react-toastify';
import { FaEye, FaCalendar, FaFolder, FaTags } from 'react-icons/fa';
import { NEWS_STATUS_NAMES, NEWS_STATUS_COLORS } from '../../utils/constants';
import { formatDate } from '../../utils/helpers';
import LoadingSpinner from '../../components/LoadingSpinner';

const NewsHistory = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchMyNews();
  }, []);

  const fetchMyNews = async () => {
    try {
      const response = await newsService.getMyNews(false); // activeOnly=false: lấy tất cả news
      setNews(response.data);
    } catch (error) {
      toast.error('Failed to load news history');
    } finally {
      setLoading(false);
    }
  };

  const filteredNews = news.filter((item) => {
    if (filter === 'all') return true;
    return item.newsStatus === parseInt(filter);
  });

  const statusCounts = {
    total: news.length,
    active: news.filter((n) => n.newsStatus === 1).length,
    inactive: news.filter((n) => n.newsStatus === 0).length,
  };

  if (loading) {
    return <LoadingSpinner fullScreen />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">My News History</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-md p-4">
          <p className="text-gray-500 text-sm mb-1">Total Articles</p>
          <p className="text-2xl font-bold text-gray-800">{statusCounts.total}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <p className="text-gray-500 text-sm mb-1">Active</p>
          <p className="text-2xl font-bold text-green-600">{statusCounts.active}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <p className="text-gray-500 text-sm mb-1">Inactive</p>
          <p className="text-2xl font-bold text-red-600">{statusCounts.inactive}</p>
        </div>
      </div>

      <div className="mb-6">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="all">All Status</option>
          <option value="1">Active</option>
          <option value="0">Inactive</option>
        </select>
      </div>

      {filteredNews.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <p className="text-xl text-gray-500">No news articles found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNews.map((item) => (
            <div key={item.newsArticleId} className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden">
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">
                    <FaFolder className="inline mr-1" />
                    {item.categoryName}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${NEWS_STATUS_COLORS[item.newsStatus]}`}>
                    {NEWS_STATUS_NAMES[item.newsStatus]}
                  </span>
                </div>

                <h2 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">{item.newsTitle}</h2>

                {item.headline && (
                  <p className="text-gray-600 mb-4 line-clamp-2">{item.headline}</p>
                )}

                <div className="border-t pt-4 space-y-2 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <FaCalendar />
                    <span>Created: {formatDate(item.createdDate)}</span>
                  </div>
                  {item.modifiedDate && (
                    <div className="flex items-center gap-2">
                      <FaCalendar />
                      <span>Updated: {formatDate(item.modifiedDate)}</span>
                    </div>
                  )}
                  {item.tags && item.tags.length > 0 && (
                    <div className="flex items-start gap-2">
                      <FaTags className="mt-1" />
                      <div className="flex flex-wrap gap-1">
                        {item.tags.map((tag) => (
                          <span key={tag.tagId} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                            {tag.tagName}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <Link
                  to={`/news/${item.newsArticleId}`}
                  className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                  <FaEye />
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NewsHistory;
