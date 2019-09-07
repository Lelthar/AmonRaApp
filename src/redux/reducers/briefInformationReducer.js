import {
  VISIBLE,
} from "../actions/briefInformationActions"

const defaultData = {
  VISIBLE: false,
};

const briefInformationReducer = (data = defaultData, action) => {
  switch (action.type) {
    case VISIBLE:
      return {
        VISIBLE: action.data,
      };
    default:
      return data;
  }
};

export default briefInformationReducer;