import axiosInstance from '../utils/axios';

export const newsService = {
  getAllNews: async () => {
    const response = await axiosInstance.get('/news-articles');
    return response.data;
  },

  searchNews: async (searchTerm) => {
    const response = await axiosInstance.get('/news-articles/search', {
      params: { searchTerm },
    });
    return response.data;
  },

  getMyNews: async (activeOnly = true) => {
    const response = await axiosInstance.get('/news-articles/my-news', {
      params: { activeOnly },
    });
    return response.data;
  },

  getNewsDetail: async (id) => {
    const response = await axiosInstance.get(`/news-articles/${id}`);
    return response.data;
  },

  createNews: async (data) => {
    const response = await axiosInstance.post('/news-articles', data);
    return response.data;
  },

  updateNews: async (id, data) => {
    const response = await axiosInstance.put(`/news-articles/${id}`, data);
    return response.data;
  },

  deleteNews: async (id) => {
    const response = await axiosInstance.delete(`/news-articles/${id}`);
    return response.data;
  },

  getStatistics: async (startDate, endDate) => {
    const response = await axiosInstance.post('/news-articles/statistics', {
      startDate,
      endDate,
    });
    return response.data;
  },

  getStatisticsSummary: async (startDate, endDate) => {
    const response = await axiosInstance.post('/news-articles/statistics/summary', {
      startDate,
      endDate,
    });
    return response.data;
  },

  getDailyBreakdown: async (startDate, endDate) => {
    const response = await axiosInstance.post('/news-articles/statistics/daily-breakdown', {
      startDate,
      endDate,
    });
    return response.data;
  },
};
