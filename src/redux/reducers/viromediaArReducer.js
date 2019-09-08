import {
    PLACE,
  } from "../actions/viromediaArAction"
  
  const defaultData = {
    PLACE: "placeNull",
  };
  
  const menuDataReducer = (data = defaultData, action) => {
    switch (action.type) {
      case PLACE:
        return {
          PLACE: action.data,
        };
      default:
        return data;
    }
  }
  
  export default menuDataReducer;