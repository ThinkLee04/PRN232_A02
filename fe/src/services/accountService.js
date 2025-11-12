import axiosInstance from '../utils/axios';

export const accountService = {
  getAllAccounts: async () => {
    const response = await axiosInstance.get('/accounts');
    return response.data;
  },

  getAccountDetail: async (id) => {
    const response = await axiosInstance.get(`/accounts/${id}`);
    return response.data;
  },

  createAccount: async (data) => {
    const response = await axiosInstance.post('/accounts', data);
    return response.data;
  },

  updateAccount: async (id, data) => {
    const response = await axiosInstance.put(`/accounts/${id}`, data);
    return response.data;
  },

  deleteAccount: async (id) => {
    const response = await axiosInstance.delete(`/accounts/${id}`);
    return response.data;
  },

  changePassword: async (id, data) => {
    const response = await axiosInstance.put(`/accounts/${id}/change-password`, data);
    return response.data;
  },
};
