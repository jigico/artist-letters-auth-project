import { combineReducers, createStore } from "redux";
import letter from "../modules/letterSlice";
import member from "../modules/memberSlice";
import auth from "../modules/authSlice";
import { configureStore } from "@reduxjs/toolkit";

// const rootReducer = combineReducers({
//   letter: letter,
//   member: member
// });
// const store = createStore(rootReducer);

const store = configureStore({
  reducer: { letter, member, auth }
});

const getStore = () => store;
export default getStore;
