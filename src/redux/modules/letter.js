//Action Value
const UPDATE_LETTER = "letter/UPDATE_LETTER";
const DELETE_LETTER = "letter/DELETE_LETTER";
const ADD_LETTER = "letter/ADD_LETTER";

//Action Creator
export const updateLetter = (payload) => {
  return {
    type: UPDATE_LETTER,
    payload
  };
};

export const deleteLetter = (payload) => {
  return {
    type: DELETE_LETTER,
    payload
  };
};

export const AddLetter = (payload) => {
  return {
    type: ADD_LETTER,
    payload
  };
};

const LOCAL_KEY = "letter"; //localStorage key
const initial = JSON.parse(localStorage.getItem(LOCAL_KEY));

//초깃값
const initialState = {
  data: initial !== null ? initial : {},
  localKey: LOCAL_KEY
};

//리듀서
const letter = (state = initialState, action) => {
  console.log(state);
  switch (action.type) {
    case UPDATE_LETTER:
      const { updateMemberId, updateIdx, content } = action.payload;
      state.data[updateMemberId][updateIdx].content = content;
      localStorage.setItem(LOCAL_KEY, JSON.stringify(state.data));
      return {
        ...state,
        data: state.data
      };
    case DELETE_LETTER:
      const { memberId, deleteIdx } = action.payload;
      state.data[memberId].splice(deleteIdx, 1);
      localStorage.setItem(LOCAL_KEY, JSON.stringify(state.data));
      return {
        ...state,
        data: state.data
      };
    case ADD_LETTER:
      const { newDataObj, selected } = action.payload;
      const newDataArr = state.data;
      const pushDataArr = state.data[selected] ? state.data[selected] : [];
      pushDataArr.push(newDataObj);
      newDataArr[selected] = pushDataArr;
      localStorage.setItem(LOCAL_KEY, JSON.stringify(newDataArr));
      return {
        ...state,
        data: { ...newDataArr }
      };
    default:
      return state;
  }
};

export default letter;
