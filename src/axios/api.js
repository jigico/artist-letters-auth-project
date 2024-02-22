import axios from "axios";
import { toast } from "react-toastify";
import { logout } from "../redux/modules/authSlice";

let store;
import("../redux/config/configStore").then((module) => {
  store = module.default();
});

const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  timeout: 2000,
  headers: { "Content-Type": "application/json" }
});

instance.interceptors.request.use(
  (config) => {
    //헤더에 토큰 추가
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
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
    console.log(error);
    toast.error(error.response.data.message);
    if (error.response.data.message === "토큰이 만료되었습니다. 다시 로그인 해주세요.") {
      //로그아웃 처리
      return store.dispatch(logout());
      return;
    }
    return Promise.reject(error);
  }
);

export default instance;
