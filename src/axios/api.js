import axios from "axios";
import { toast } from "react-toastify";

const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  timeout: 2000
});

instance.interceptors.request.use(
  (config) => {
    return config;
  },

  (error) => {
    // alert(error.response.data.message);
    toast.error(error.response.data.message);
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },

  (error) => {
    // console.log(error);
    toast.error(error.response.data.message);
    return Promise.reject(error);
  }
);

export default instance;
