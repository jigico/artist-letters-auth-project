import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  timeout: 2000
});

instance.interceptors.request.use(
  (config) => {
    // const accessToken = getCookie("accessToken");
    // console.log(accessToken);
    return config;
  },

  (error) => {
    alert(error.response.data.message);
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },

  (error) => {
    // console.log(error);
    alert(error.response.data.message);
    return Promise.reject(error);
  }
);

export default instance;
