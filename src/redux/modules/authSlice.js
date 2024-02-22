import { createSlice } from "@reduxjs/toolkit";
import { getCookie } from "util/cookie";

const COOKIE_KEY = "accessToken";
const ACCESS_TOKEN = getCookie(COOKIE_KEY);

const initialState = {
  isLogin: false,
  user: {
    userId: "",
    avatar: "",
    nickname: "",
    accessToken: ""
  }
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      const { userId, avatar, nickname, accessToken } = action.payload;
      state.isLogin = true;
      //localStorage 저장
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("userId", userId);
      localStorage.setItem("avatar", avatar);
      localStorage.setItem("nickname", nickname);
    },
    logout: (state) => {
      state.isLogin = false;
      if (ACCESS_TOKEN) document.cookie = COOKIE_KEY + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userId");
      localStorage.removeItem("avatar");
      localStorage.removeItem("nickname");
    },
    setUser: (state, action) => {
      const { userId, avatar, nickname, accessToken } = action.payload;
      //localStorage 저장
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("userId", userId);
      localStorage.setItem("avatar", avatar);
      localStorage.setItem("nickname", nickname);
      //state 저장
      state.user = {
        userId,
        avatar,
        nickname,
        accessToken
      };
    }
  }
});

export const { login, logout, setUser } = authSlice.actions;
export default authSlice.reducer;
