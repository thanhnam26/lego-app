//// vi du cho nay de chua base URL
const HOSTNAME = "192.168.0.101";
const PORT = 9999;

import axios from "axios";

const API = {
  apiAllProduct: async () => {
    return axios.get(`http://${HOSTNAME}:${PORT}/product/listall`);
  },
  apiGetProductDetail: async (id) => {
    return axios.get(`http://${HOSTNAME}:${PORT}/product/detail/${id}`);
  },
  apiAllCategory: async () => {
    return axios.get(`http://${HOSTNAME}:${PORT}/category/list`);
  },
  apiGetProductsByCategory: async (categoryId) => {
    return axios.get(
      `http://${HOSTNAME}:${PORT}/product/category/${categoryId}`
    );
  },
  apiAll: async (search = "", page = 1, limit = 6) => {
    return axios.get(`http://${HOSTNAME}:${PORT}/product/allProduct`, {
      params: { search, page, limit },
    });
  },

  apiCreateBill: async (billData) => {
    return axios.post(`http://${HOSTNAME}:${PORT}/bill/addtobill`, billData);
  },
  apiLogin: async (credentials) => {
    return axios.post(`http://${HOSTNAME}:${PORT}/users/login`, credentials);
  },
  apiRegister: async (userData) => {
    return axios.post(`http://${HOSTNAME}:${PORT}/users/register`, userData);
  },
  apiGetProfile: async () => {
    return axios.get(`http://${HOSTNAME}:${PORT}/users/profile`, {
        headers: {
            Authorization: `Bearer ${token}`, // Token phải được lưu khi người dùng đăng nhập
        }
    });
},
};
export default API;
