import { useState } from 'react';
import { newsService } from '../../services/newsService';
import { toast } from 'react-toastify';
import { FaChartBar, FaNewspaper, FaCheckCircle, FaEdit, FaUsers, FaCalendar } from 'react-icons/fa';
import { formatDate, formatDateForInput } from '../../utils/helpers';
import LoadingSpinner from '../../components/LoadingSpinner';

const Statistics = () => {
  const [loading, setLoading] = useState(false);
  const [statistics, setStatistics] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleGenerateReport = async (e) => {
    e.preventDefault();

    if (!startDate || !endDate) {
      toast.error('Please select both start and end dates');
      return;
    }

    if (new Date(startDate) > new Date(endDate)) {
      toast.error('Start date must be before end date');
      return;
    }

    setLoading(true);
    try {
      const response = await newsService.getStatistics(startDate, endDate);
      setStatistics(response.data);
      toast.success('Statistics generated successfully');
    } catch (error) {
      toast.error('Failed to generate statistics');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">News Statistics Report</h1>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <form onSubmit={handleGenerateReport} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FaCalendar className="inline mr-2" />
                Start Date *
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FaCalendar className="inline mr-2" />
                End Date *
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors disabled:bg-blue-300 flex items-center justify-center gap-2"
          >
            {loading ? <LoadingSpinner size="small" /> : (
              <>
                <FaChartBar />
                Generate Report
              </>
            )}
          </button>
        </form>
      </div>

      {statistics && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm font-medium mb-1">Total News</p>
                  <p className="text-3xl font-bold text-gray-800">{statistics.totalNews}</p>
                </div>
                <div className="p-3 bg-blue-100 rounded-full">
                  <FaNewspaper className="text-2xl text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm font-medium mb-1">Published (Active)</p>
                  <p className="text-3xl font-bold text-green-600">{statistics.totalPublished}</p>
                </div>
                <div className="p-3 bg-green-100 rounded-full">
                  <FaCheckCircle className="text-2xl text-green-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm font-medium mb-1">Inactive</p>
                  <p className="text-3xl font-bold text-red-600">{statistics.totalInactive}</p>
                </div>
                <div className="p-3 bg-red-100 rounded-full">
                  <FaEdit className="text-2xl text-red-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm font-medium mb-1">Authors</p>
                  <p className="text-3xl font-bold text-purple-600">{statistics.totalAuthors}</p>
                </div>
                <div className="p-3 bg-purple-100 rounded-full">
                  <FaUsers className="text-2xl text-purple-600" />
                </div>
              </div>
            </div>
          </div>

          {statistics.topCategory && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Top Category</h2>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-blue-600">{statistics.topCategory.categoryName}</p>
                  <p className="text-gray-500">Most popular category in this period</p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-gray-800">{statistics.topCategory.count}</p>
                  <p className="text-gray-500">articles</p>
                </div>
              </div>
            </div>
          )}

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Daily Breakdown</h2>
            
            {statistics.dailyBreakdown && statistics.dailyBreakdown.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Total News
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Categories
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {statistics.dailyBreakdown
                      .sort((a, b) => new Date(b.date) - new Date(a.date))
                      .map((daily, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="font-medium text-gray-900">{formatDate(daily.date)}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm font-semibold">
                              {daily.totalNews}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex flex-wrap gap-2">
                              {daily.categoryBreakdown.map((cat) => (
                                <span
                                  key={cat.categoryId}
                                  className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
                                >
                                  {cat.categoryName}: {cat.count}
                                </span>
                              ))}
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-center text-gray-500 py-4">No daily breakdown available</p>
            )}
          </div>
        </div>
      )}

      {!statistics && !loading && (
        <div className="text-center py-12">
          <FaChartBar className="text-6xl text-gray-300 mx-auto mb-4" />
          <p className="text-xl text-gray-500">Select a date range to generate statistics</p>
        </div>
      )}
    </div>
  );
};

export default Statistics;
