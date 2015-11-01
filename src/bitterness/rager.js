import splitMeasure from '../split-measure-units'
import round from '../round'

const ogThreshold = 1.050
const adjustmentFactor = 0.2
const hopUtilization = 7462
const boilTimeAdjustment = 31.32
const calcWeightUnit = 'oz'
const calcVolumeUnit = 'gal'

export default function (hopWeight, hopAlphaAcid, boilTime, recipeVolume, originalGravity) {
  const [weight] = splitMeasure(hopWeight, calcWeightUnit)
  const [time] = splitMeasure(boilTime)
  const [volume] = splitMeasure(recipeVolume, calcVolumeUnit)

  let gravityAdjustment = 0
  if (originalGravity > ogThreshold) {
    gravityAdjustment = (originalGravity - ogThreshold) / adjustmentFactor
  }

  const utilization = (18.11 + 13.86 * Math.tanh((time - boilTimeAdjustment) / 18.27)) / 100
  const aau = weight * (hopAlphaAcid / 100)
  const IBU = (utilization * aau * hopUtilization) / (volume + gravityAdjustment)

  return round(IBU, 0)
}
