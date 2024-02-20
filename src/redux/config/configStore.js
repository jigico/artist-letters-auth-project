import { combineReducers, createStore } from "redux";
import letter from "../modules/letter";
import member from "../modules/member";
import { configureStore } from "@reduxjs/toolkit";

// const rootReducer = combineReducers({
//   letter: letter,
//   member: member
// });
// const store = createStore(rootReducer);

const store = configureStore({
  reducer: { letter, member }
});

export default store;
