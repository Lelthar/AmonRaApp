export const UPDATE = "UPDATE";

export const FUEL = "FUEL";
export const SPEED = "SPEED";
export const RPM = "RPM";
export const FUELCONSUMPTIONRATE = "FUELCONSUMPTIONRATE";

export const fuelAction = (data) => ({
  data: data,
  type: FUEL
});

export const speedAction = (data) => ({
  data: data,
  type: SPEED
});

export const rpmAction = (data) => ({
  data: data,
  type: RPM
});

export const fuelConsumtionRateAction = (data) => ({
  data: data,
  type: FUELCONSUMPTIONRATE
});
