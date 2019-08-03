import { applyMiddleware, createStore } from "redux";
import rootReducer from "./combineReducers";
import thunk from 'redux-thunk';

const setupStore = createStore(
  rootReducer,
  applyMiddleware(thunk)
);


export default setupStore;