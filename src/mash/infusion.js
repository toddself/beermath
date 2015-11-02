import convert from 'convert-units'
import splitMeasure from '@toddself/split-measure-units'
import round from '@toddself/round'

const grainSH = 0.2
const hltTemp = 210
const calcTempUnit = 'f'
const calcVolumeUnit = 'qt'
const calcWeightUnit = 'lb'

export default function (currTemp, targetTemp, currWaterVolume, gristWeight) {
  const [curr] = splitMeasure(currTemp, calcTempUnit)
  const [target] = splitMeasure(targetTemp, calcTempUnit)
  const [volume, , volumeu] = splitMeasure(currWaterVolume, calcVolumeUnit)
  const [weight] = splitMeasure(gristWeight, calcWeightUnit)
  const grainAdj = grainSH * weight
  let volumeToAdd = ((target - curr) * (grainAdj + volume)) / (hltTemp - target)

  if (volumeu !== calcVolumeUnit) {
    volumeToAdd = convert(volumeToAdd).from(calcVolumeUnit).to(volumeu)
  }

  const adjustment = `${round(volumeToAdd, 1)} ${volumeu}`
  return adjustment
}
