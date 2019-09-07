export const UPDATE = "UPDATE";

export const FILTERMENU = "FILTERMENU";
export const ACTIVEFILTERS = "ACTIVEFILTERS";
export const MENUSIDE = "MENUSIDE";
export const RATESCREEN = "RATESCREEN";
export const GUIDESCREEN = "GUIDESCREEN";
export const MENURESET = "MENURESET";

export const filterMenuAction = (data) => ({
  data: data,
  type: FILTERMENU
});

export const activeFiltersAction = (data) => ({
  data: data,
  type: ACTIVEFILTERS,
});

export const menuSideAction = (data) => ({
  data: data,
  type: MENUSIDE,
});

export const rateScreenAction = (data) => ({
  data: data,
  type: RATESCREEN,
});

export const guideScreenAction = (data) => ({
  data: data,
  type: GUIDESCREEN
});

export const menuResetAction = () => ({
  type: MENURESET,
});