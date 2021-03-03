import { combineReducers } from "redux";
import { apiReducer } from "./api/reducer";

const reducers = combineReducers({
  reducerApi: apiReducer
});
export default reducers;
