import splitMeasure from '../split-measure-units'
import round from '../round'

// These constants were derived by Glenn Tinseth
const bignessMultiplier = 1.65
const bignessGravityBase = 0.000125
const maxUtilization = 4.15
const curveShape = -0.04
const calcWeightUnit = 'oz'
const calcVolumeUnit = 'gal'

function bignessFactor (gravity) {
  const adjustedGravity = Math.pow(bignessGravityBase, (gravity - 1))
  return bignessMultiplier * adjustedGravity
}

function boilTimeFactor (boilTime) {
  return (1 - Math.pow(Math.E, (curveShape * boilTime))) / maxUtilization
}

export default function tinseth (hopWeight, hopAlphaAcid, hopBoilTime, recipeVolume, originalGravity) {
  const [volume] = splitMeasure(recipeVolume, calcVolumeUnit)
  const [weight] = splitMeasure(hopWeight, calcWeightUnit)
  const [time] = splitMeasure(hopBoilTime)

  const bigness = bignessFactor(originalGravity)
  const boilAdjustment = boilTimeFactor(time)
  const utilization = bigness * boilAdjustment
  const aau = weight * hopAlphaAcid
  const IBU = (aau * utilization * 75) / volume
  return round(IBU, 0)
}
