import { createSlice } from "@reduxjs/toolkit";

const LOCAL_KEY = "letter"; //localStorage key
const initial = JSON.parse(localStorage.getItem(LOCAL_KEY));

//초깃값
const initialState = {
  data: initial !== null ? initial : {},
  localKey: LOCAL_KEY
};

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
  }
});

export const { updateLetter, deleteLetter, addLetter } = letterSlice.actions;
export default letterSlice.reducer;
