const tempRatio = 5 / 9
const tempAdjust = 32

export function toFahrenheit (c) {
  return (c / tempRatio) + tempAdjust
}

export function toCelsius (f) {
  return (f - tempAdjust) * tempRatio
}
