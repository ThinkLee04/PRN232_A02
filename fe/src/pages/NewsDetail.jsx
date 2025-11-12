import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { newsService } from '../services/newsService';
import { toast } from 'react-toastify';
import { FaCalendar, FaUser, FaFolder, FaTags, FaArrowLeft, FaGlobe } from 'react-icons/fa';
import { formatDateTime } from '../utils/helpers';
import LoadingSpinner from '../components/LoadingSpinner';

const NewsDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNewsDetail();
  }, [id]);

  const fetchNewsDetail = async () => {
    try {
      const response = await newsService.getNewsDetail(id);
      setNews(response.data);
    } catch (error) {
      toast.error('Failed to load news article');
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner fullScreen />;
  }

  if (!news) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6 transition-colors"
      >
        <FaArrowLeft />
        <span>Back</span>
      </button>

      <article className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <div className="mb-6">
          <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold mb-4">
            <FaFolder className="inline mr-1" />
            {news.categoryName}
          </span>

          <h1 className="text-4xl font-bold text-gray-800 mb-4">{news.newsTitle}</h1>

          {news.headline && (
            <p className="text-xl text-gray-600 mb-6 font-medium">{news.headline}</p>
          )}

          <div className="flex flex-wrap gap-4 text-sm text-gray-500 border-b pb-4">
            <div className="flex items-center gap-2">
              <FaUser />
              <span>By {news.createdByName}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaCalendar />
              <span>{formatDateTime(news.createdDate)}</span>
            </div>
            {news.newsSource && (
              <div className="flex items-center gap-2">
                <FaGlobe />
                <span>{news.newsSource}</span>
              </div>
            )}
          </div>

          {news.modifiedDate && (
            <p className="text-sm text-gray-500 mt-2">
              Last updated: {formatDateTime(news.modifiedDate)}
              {news.updatedByName && ` by ${news.updatedByName}`}
            </p>
          )}
        </div>

        <div className="prose max-w-none mb-8">
          <div
            className="text-gray-700 leading-relaxed whitespace-pre-wrap"
            dangerouslySetInnerHTML={{ __html: news.newsContent.replace(/\n/g, '<br />') }}
          />
        </div>

        {news.tags && news.tags.length > 0 && (
          <div className="border-t pt-6">
            <div className="flex items-start gap-2">
              <FaTags className="mt-1 text-gray-500" />
              <div className="flex flex-wrap gap-2">
                {news.tags.map((tag) => (
                  <span
                    key={tag.tagId}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                  >
                    {tag.tagName}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </article>
    </div>
  );
};

export default NewsDetail;
