const { memberData } = require("shared/memberData");

//action value
const SET_MEMBER_ID = "SET_MEMBER_ID";

//action creator
export const setMemberId = (payload) => {
  return {
    type: SET_MEMBER_ID,
    payload
  };
};

//초깃값
const initialState = {
  memberData: memberData,
  memberId: 1
};

const member = (state = initialState, action) => {
  switch (action.type) {
    case SET_MEMBER_ID:
      return {
        ...state,
        memberId: action.payload
      };
    default:
      return state;
  }
};

export default member;
