import convert from 'convert-units'
import splitMeasure from '@toddself/split-measure-units'

const grainAbsorption = 0.2 // gallons water per pound of grist
const calcVolumeUnits = 'gal'
const calcWeightUnits = 'lbs'

export default function (targetBoil, gristWeight, mltLoss, hltLoss, bkLoss) {
  const [bv, bvu] = splitMeasure(targetBoil)
  const [gw] = splitMeasure(gristWeight, calcWeightUnits)
  const [mlt] = splitMeasure(mltLoss, calcVolumeUnits)
  const [hlt] = splitMeasure(hltLoss, calcVolumeUnits)
  const [bk] = splitMeasure(bkLoss, calcVolumeUnits)

  const grainLoss = gw * grainAbsorption
  const totalWater = grainLoss + mlt + hlt + bk + bv
  return convert(totalWater).from(calcVolumeUnits).to(bvu)
}
