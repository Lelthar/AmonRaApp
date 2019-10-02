export const NORMAL_STYLE = "NORMAL_STYLE";
export const MAP_STYLE = "MAP_STYLE";
export const LAYERS_MENU_VISIBLE = "LAYERS_MENU_VISIBLE";
export const REGION = "REGION";
export const OUT_BARRIO_AMON = "OUT_BARRIO_AMON";

export const setMapStyleAction = (data) => ({
  data: data,
  type: NORMAL_STYLE,
});

export const changeLayerMenuVisibilityAction = () => ({
  type: LAYERS_MENU_VISIBLE,
});

export const setRegionAction = (data) => ({
  data: data,
  type: REGION,
});

export const setOutBarrioAmonVisibilityAction = (data) => ({
  data: data,
  type: OUT_BARRIO_AMON,
});
