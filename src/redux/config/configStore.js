import { combineReducers, createStore } from "redux";
import letter from "../modules/letter";
import member from "../modules/member";

const rootReducer = combineReducers({
  letter: letter,
  member: member
});
const store = createStore(rootReducer);

export default store;
