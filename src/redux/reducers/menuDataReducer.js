import {
  FUEL,
  SPEED,
  RPM,
  FUELCONSUMPTIONRATE
} from "../actions/menuDataActions"

const defaultData = {
  FUEL: 0,
  SPEED: 0,
  RPM: 0,
  FUELCONSUMPTIONRATE: 0,
}

const dataReducer = (data = defaultData, action) => {
  switch (action.type) {
    case FUEL:
      data.FUEL = action.data;
      return data;
    case SPEED:
      data.SPEED = action.data;
      return data;
    case RPM:
      data.RPM = action.data;
      return data;
    case FUELCONSUMPTIONRATE:
      data.FUELCONSUMPTIONRATE = action.data;
      return data;
    default:
      return data;
  }
}

export default dataReducer;