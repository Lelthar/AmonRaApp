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
};

const menuDataReducer = (data = defaultData, action) => {
  switch (action.type) {
    case FILTERMENU:
      return {
        FILTERMENU: action.data,
        ACTIVEFILTERS: data.ACTIVEFILTERS,
        MENUSIDE: data.MENUSIDE,
        RATESCREEN: data.RATESCREEN,
        GUIDESCREEN: data.GUIDESCREEN,
      };
    case ACTIVEFILTERS:
      return {
        FILTERMENU: data.FILTERMENU,
        ACTIVEFILTERS: action.data,
        MENUSIDE: data.MENUSIDE,
        RATESCREEN: data.RATESCREEN,
        GUIDESCREEN: data.GUIDESCREEN,
      };
    case MENUSIDE:
      return {
        FILTERMENU: data.FILTERMENU,
        ACTIVEFILTERS: data.ACTIVEFILTERS,
        MENUSIDE: action.data,
        RATESCREEN: data.RATESCREEN,
        GUIDESCREEN: data.GUIDESCREEN,
      };
    case RATESCREEN:
      return {
        FILTERMENU: data.FILTERMENU,
        ACTIVEFILTERS: data.ACTIVEFILTERS,
        MENUSIDE: data.MENUSIDE,
        RATESCREEN: action.data,
        GUIDESCREEN: data.GUIDESCREEN,
      };
    case GUIDESCREEN:
      return {
        FILTERMENU: data.FILTERMENU,
        ACTIVEFILTERS: data.ACTIVEFILTERS,
        MENUSIDE: data.MENUSIDE,
        RATESCREEN: data.RATESCREEN,
        GUIDESCREEN: action.data,
      };
    case MENURESET:
      return {
        FILTERMENU: false,
        ACTIVEFILTERS: data.ACTIVEFILTERS,
        MENUSIDE: false,
        RATESCREEN: false,
        GUIDESCREEN: false,
      };
    default:
      return data;
  }
}

export default menuDataReducer;