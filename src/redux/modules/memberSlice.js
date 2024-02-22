import { createSlice } from "@reduxjs/toolkit";
const { memberData } = require("shared/memberData");

//초깃값
const initialState = {
  memberData: memberData,
  memberId: 1
};

const memberSlice = createSlice({
  name: "member",
  initialState,
  reducers: {
    setMemberId: (state, action) => {
      return {
        ...state,
        memberId: action.payload
      };
    }
  }
});

export const { setMemberId } = memberSlice.actions;
export default memberSlice.reducer;
