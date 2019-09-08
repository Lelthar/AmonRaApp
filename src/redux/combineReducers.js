import { combineReducers } from "redux";
import menuDataReducer from "./reducers/menuDataReducer";
import viromediaArReducer from "./reducers/viromediaArReducer";

export default combineReducers({
  menuDataReducer,
  viromediaArReducer,
});
