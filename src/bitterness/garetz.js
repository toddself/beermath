import splitMeasure from '@toddself/split-measure-units'
import round from '@toddself/round'

const hopUtilization = 0.749
const calcWeightUnit = 'oz'
const calcVolumeUnit = 'gal'

function getPercentUtilization (minutes) {
  if (minutes < 11) {
    return 0
  } else if (minutes > 10 && minutes < 16) {
    return 2
  } else if (minutes > 15 && minutes < 21) {
    return 5
  } else if (minutes > 20 && minutes < 26) {
    return 8
  } else if (minutes > 25 && minutes < 31) {
    return 11
  } else if (minutes > 30 && minutes < 36) {
    return 14
  } else if (minutes > 35 && minutes < 41) {
    return 16
  } else if (minutes > 40 && minutes < 46) {
    return 18
  } else if (minutes > 45 && minutes < 51) {
    return 19
  } else if (minutes > 50 && minutes < 61) {
    return 20
  } else if (minutes > 60 && minutes < 71) {
    return 21
  } else if (minutes > 70 && minutes < 81) {
    return 22
  } else {
    return 23
  }
}

export default function garetz (hopWeight, hopAlphaAcid, hopBoilTime, recipeVolume, originalGravity, batchVolume, targetIBU, elevation) {
  const [batch] = splitMeasure(batchVolume, calcVolumeUnit)
  const [recipe] = splitMeasure(recipeVolume, calcVolumeUnit)
  const [weight] = splitMeasure(hopWeight, calcWeightUnit)
  const [time] = splitMeasure(hopBoilTime)

  const cf = recipe / batch
  const bg = cf * (originalGravity - 1) + 1
  const gf = ((bg - 1.050) / 0.2) + 1
  const hf = ((cf * targetIBU) / 260) + 1
  const tf = ((elevation / 550) * 0.02) + 1
  const ca = gf * hf * tf

  const utilization = getPercentUtilization(time)
  const aau = hopAlphaAcid * weight
  const IBU = utilization * aau * hopUtilization / (recipe * ca)
  return round(IBU, 0)
}
