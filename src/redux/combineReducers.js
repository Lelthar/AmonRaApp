import { combineReducers } from "redux";

import menuDataReducer from "./reducers/menuDataReducer";
import briefInformationReducer from "./reducers/briefInformationReducer";
import mapReducer from "./reducers/mapReducer";

export default combineReducers({
  menuDataReducer,
  briefInformationReducer,
  mapReducer,
});
