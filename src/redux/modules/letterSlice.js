import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const LOCAL_KEY = "letter"; //localStorage key
const initial = JSON.parse(localStorage.getItem(LOCAL_KEY));

//초깃값
const initialState = {
  // data: initial !== null ? initial : {},
  data: [],
  // localKey: LOCAL_KEY,
  isLoading: false,
  isError: false,
  error: null
};

const getLettersFromDB = async () => {
  const { data } = await axios.get(`${process.env.REACT_APP_JSON_SERVER_URL}/letters`);
  return data;
};

export const __addLetter = createAsyncThunk("addLetter", async (payload, thunkAPI) => {
  try {
    await axios.post(`${process.env.REACT_APP_JSON_SERVER_URL}/letters`, payload);
    const data = await getLettersFromDB();
    return thunkAPI.fulfillWithValue(data);
  } catch (error) {
    console.error(error);
    return thunkAPI.rejectWithValue(error);
  }
});

export const __getLetter = createAsyncThunk("getLetter", async (payload, thunkAPI) => {
  try {
    const data = await getLettersFromDB();
    return thunkAPI.fulfillWithValue(data);
  } catch (error) {
    console.error(error);
    return thunkAPI.rejectWithValue(error);
  }
});

export const __updateLetter = createAsyncThunk("updateLetter", async (payload, thunkAPI) => {
  try {
    const response = await axios.patch(`${process.env.REACT_APP_JSON_SERVER_URL}/letters/${payload.id}`, { content: payload.content, nickname: payload.nickname });
    return thunkAPI.fulfillWithValue(response.data);
  } catch (error) {
    alert(error.response.data.message);
    return thunkAPI.rejectWithValue(error);
  }
});

export const __deleteLetter = createAsyncThunk("deleteLetter", async (payload, thunkAPI) => {
  try {
    const response = await axios.delete(`${process.env.REACT_APP_JSON_SERVER_URL}/letters/${payload}`);
    return thunkAPI.fulfillWithValue(response.data);
  } catch (error) {
    alert(error.response.data.message);
    return thunkAPI.rejectWithValue(error);
  }
});

const letterSlice = createSlice({
  name: "letter",
  initialState,
  reducers: {
    updateLetter: (state, action) => {
      const { updateMemberId, updateIdx, content } = action.payload;
      state.data[updateMemberId][updateIdx].content = content;
      localStorage.setItem(LOCAL_KEY, JSON.stringify(state.data));
      // return {
      //   ...state,
      //   data: state.data
      // };
    },
    deleteLetter: (state, action) => {
      const { memberId, deleteIdx } = action.payload;
      state.data[memberId].splice(deleteIdx, 1);
      localStorage.setItem(LOCAL_KEY, JSON.stringify(state.data));
      // return {
      //   ...state,
      //   data: state.data
      // };
    },
    addLetter: (state, action) => {
      const { newDataObj, selected } = action.payload;
      const newDataArr = state.data;
      const pushDataArr = state.data[selected] ? state.data[selected] : [];
      pushDataArr.push(newDataObj);
      newDataArr[selected] = pushDataArr;
      localStorage.setItem(LOCAL_KEY, JSON.stringify(newDataArr));
      // return {
      //   ...state,
      //   data: { ...newDataArr }
      // };
    }
  },
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
      const { id, content, nickname } = action.payload;
      const newData = state.data.find((item) => {
        return item.id === id;
      });
      newData.content = content;
      newData.nickname = nickname;
      state.isLoading = false;
      state.isError = false;
      state.data = [...state.data, { ...newData }];
      localStorage.setItem(LOCAL_KEY, JSON.stringify(state.data));
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
      state.data = [...state.data];
      localStorage.setItem(LOCAL_KEY, JSON.stringify(state.data));
    });
    builder.addCase(__deleteLetter.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.payload;
    });
  }
});

export const { updateLetter, deleteLetter, addLetter } = letterSlice.actions;
export default letterSlice.reducer;
