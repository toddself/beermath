export default function round (num, places) {
  if (Number.isFinite(num)) {
    const quant = Math.pow(10, places)
    return Math.round(num * quant) / quant
  } else {
    return 0
  }
}
