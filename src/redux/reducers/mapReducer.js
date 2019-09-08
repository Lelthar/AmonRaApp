import {
  NORMAL_STYLE,
  LAYERS_MENU_VISIBLE,
  REGION,
} from "../actions/mapActions"

import {
  BARRIO_AMON_LOCATION,
} from "../../assets/constants/map";

const defaultData = {
  NORMAL_STYLE: true,
  MAP_STYLE: 'standard',
  LAYERS_MENU_VISIBLE: false,
  REGION: BARRIO_AMON_LOCATION,
};

const mapReducer = (data = defaultData, action) => {
  switch (action.type) {
    case NORMAL_STYLE:
      return {
        NORMAL_STYLE: action.data,
        MAP_STYLE: (action.data ? "standard" : "hybrid"),
        LAYERS_MENU_VISIBLE: data.LAYERS_MENU_VISIBLE,
        REGION: data.REGION,
      };
    case LAYERS_MENU_VISIBLE:
      return {
        NORMAL_STYLE: data.NORMAL_STYLE,
        MAP_STYLE: data.MAP_STYLE,
        LAYERS_MENU_VISIBLE: !data.LAYERS_MENU_VISIBLE,
        REGION: data.REGION,
      };
    case REGION:
      return {
        NORMAL_STYLE: data.NORMAL_STYLE,
        MAP_STYLE: data.MAP_STYLE,
        LAYERS_MENU_VISIBLE: data.LAYERS_MENU_VISIBLE,
        REGION: action.data,
      };
    default:
      return data;
  }
};

export default mapReducer;