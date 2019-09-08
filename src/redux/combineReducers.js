import { combineReducers } from "redux";

import menuDataReducer from "./reducers/menuDataReducer";
import briefInformationReducer from "./reducers/briefInformationReducer";
import mapReducer from "./reducers/mapReducer";
import viromediaArReducer from "./reducers/viromediaArReducer";

export default combineReducers({
  menuDataReducer,
  briefInformationReducer,
  mapReducer,
  viromediaArReducer,
});
