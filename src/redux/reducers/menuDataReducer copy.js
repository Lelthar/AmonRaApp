import {
  FILTERMENU,
  ACTIVEFILTERS,
  MENUSIDE,
  RATESCREEN,
  GUIDESCREEN,
  MENURESET
} from "../actions/menuDataActions"

const defaultData = {
  FILTERMENU: false,
  ACTIVEFILTERS: [],
  MENUSIDE: false,
  RATESCREEN: false,
  GUIDESCREEN: false,
}

const menuDataReducer = (data = defaultData, action) => {
  switch (action.type) {
    case FILTERMENU:
      data.FILTERMENU = action.data;
      return data;
    case ACTIVEFILTERS:
      data.ACTIVEFILTERS = action.data;
      return data;
    case MENUSIDE:
      data.MENUSIDE = action.data;
      return data;
    case RATESCREEN:
      data.RATESCREEN = action.data;
      return data;
    case GUIDESCREEN:
      data.GUIDESCREEN = action.data;
      return data;
    case MENURESET:
      data = {
        FILTERMENU: false,
        ACTIVEFILTERS: data.ACTIVEFILTERS,
        MENUSIDE: false,
        RATESCREEN: false,
        GUIDESCREEN: false,
      };
      return data;
    default:
      return data;
  }
}

export default menuDataReducer;