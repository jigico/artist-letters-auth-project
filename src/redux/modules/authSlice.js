import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import api from "../../axios/api";
import { getCookie } from "util/cookie";

// const COOKIE_KEY = "accessToken";
// const ACCESS_TOKEN = getCookie(COOKIE_KEY);

const initialState = {
  isLogin: !!localStorage.getItem("accessToken"),
  avatar: localStorage.getItem("avatar"),
  nickname: localStorage.getItem("nickname"),
  userId: localStorage.getItem("userId"),
  isLoading: false,
  isError: false,
  error: null
};

export const __login = createAsyncThunk("login", async (payload, thunkAPI) => {
  try {
    const { data } = await api.post("/login", { id: payload.id, password: payload.password });
    const { accessToken, avatar, nickname, userId } = data;
    if (data.success) {
      toast.success("로그인 성공");
      return thunkAPI.fulfillWithValue({ accessToken, avatar, nickname, userId });
    }
  } catch (error) {
    toast.error(error.response.data.message);
    return thunkAPI.rejectWithValue(error);
  }
});

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
      // if (ACCESS_TOKEN) document.cookie = COOKIE_KEY + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
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
    }
  },
  extraReducers: (builder) => {
    builder.addCase(__login.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(__login.fulfilled, (state, action) => {
      const { userId, avatar, nickname, accessToken } = action.payload;
      //localStorage 저장
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("userId", userId);
      localStorage.setItem("avatar", avatar);
      localStorage.setItem("nickname", nickname);
      state.isLogin = true;
      state.avatar = avatar;
      state.nickname = nickname;
      state.userId = userId;
      state.isLoading = false;
      state.isError = false;
    });
    builder.addCase(__login.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.payload;
    });
  }
});

export const { login, logout, setUser } = authSlice.actions;
export default authSlice.reducer;
