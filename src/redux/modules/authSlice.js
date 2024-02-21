import { createSlice } from "@reduxjs/toolkit";

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
    setIsLogin: (state) => {
      state.isLogin = !state.isLogin;
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

export const { setIsLogin, setUser } = authSlice.actions;
export default authSlice.reducer;
