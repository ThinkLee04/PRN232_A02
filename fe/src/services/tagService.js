import axiosInstance from '../utils/axios';

export const tagService = {
  getAllTags: async () => {
    const response = await axiosInstance.get('/tags');
    return response.data;
  },

  getAllTagsForManagement: async () => {
    const response = await axiosInstance.get('/tags/management');
    return response.data;
  },

  getTagById: async (id) => {
    const response = await axiosInstance.get(`/tags/${id}`);
    return response.data;
  },

  createTag: async (data) => {
    const response = await axiosInstance.post('/tags', data);
    return response.data;
  },

  updateTag: async (id, data) => {
    const response = await axiosInstance.put(`/tags/${id}`, data);
    return response.data;
  },
};
