import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { jsonApi } from "../../axios/jsonApi";
import axios from "axios";

export const LOCAL_KEY = "letter"; //localStorage key
const initial = JSON.parse(localStorage.getItem(LOCAL_KEY));

//초깃값
const initialState = {
  // data: initial !== null ? initial : {},
  data: [],
  // localKey: LOCAL_KEY,
  isLoading: true,
  isError: false,
  error: null
};

const getLettersFromDB = async () => {
  const { data } = await jsonApi.get(`/letters`);
  return data;
};

export const __addLetter = createAsyncThunk("addLetter", async (payload, thunkAPI) => {
  try {
    await jsonApi.post(`/letters`, payload);
    const data = await getLettersFromDB();
    return thunkAPI.fulfillWithValue(data);
  } catch (error) {
    console.error(error);
    return thunkAPI.rejectWithValue(error);
  }
});

export const __getLetter = createAsyncThunk("getLetter", async (payload, thunkAPI) => {
  try {
    const { data } = await axios.get(`${process.env.REACT_APP_JSON_SERVER_URL}/letters`);
    return thunkAPI.fulfillWithValue(data);
  } catch (error) {
    console.error(error);
    return thunkAPI.rejectWithValue(error);
  }
});

export const __updateLetter = createAsyncThunk("updateLetter", async (payload, thunkAPI) => {
  try {
    await jsonApi.patch(`/letters/${payload.id}`, { content: payload.content, nickname: payload.nickname });
    const data = await getLettersFromDB();
    return thunkAPI.fulfillWithValue(data);
  } catch (error) {
    alert(error.response.data.message);
    return thunkAPI.rejectWithValue(error);
  }
});

export const __deleteLetter = createAsyncThunk("deleteLetter", async (payload, thunkAPI) => {
  try {
    await jsonApi.delete(`/letters/${payload}`);
    const data = await getLettersFromDB();
    return thunkAPI.fulfillWithValue(data);
  } catch (error) {
    alert(error.response.data.message);
    return thunkAPI.rejectWithValue(error);
  }
});

const letterSlice = createSlice({
  name: "letter",
  initialState,
  extraReducers: (builder) => {
    //추가
    builder.addCase(__addLetter.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(__addLetter.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.data = action.payload;
    });
    builder.addCase(__addLetter.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.payload;
    });

    //조회
    builder.addCase(__getLetter.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(__getLetter.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.data = action.payload;
    });
    builder.addCase(__getLetter.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.payload;
    });

    //수정
    builder.addCase(__updateLetter.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(__updateLetter.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.data = action.payload;
    });
    builder.addCase(__updateLetter.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.payload;
    });

    //삭제
    builder.addCase(__deleteLetter.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(__deleteLetter.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.data = action.payload;
    });
    builder.addCase(__deleteLetter.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.payload;
    });
  }
});

export default letterSlice.reducer;
