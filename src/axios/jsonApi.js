import axios from "axios";
import api from "../axios/api";

export const jsonApi = axios.create({
  baseURL: process.env.REACT_APP_JSON_SERVER_URL,
  timeout: 2000,
  headers: { "Content-Type": "application/json" }
});

jsonApi.interceptors.request.use(
  async (config) => {
    const { data } = await api.get("/user");
    if (data.success) return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
