import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogin: false,
  user: {
    userId: "",
    avatar: "",
    nickname: ""
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
      const { userId, avatar, nickname } = action.payload;
      state.user = {
        userId,
        avatar,
        nickname
      };
    }
  }
});

export const { setIsLogin, setUser } = authSlice.actions;
export default authSlice.reducer;
