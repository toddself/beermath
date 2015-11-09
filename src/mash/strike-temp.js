import convert from 'convert-units'

import {toCelsius} from '../temp-convert'
import splitMeasure from '@toddself/split-measure-units'
import round from '@toddself/round'

const calcWeightMeasure = 'lb'
const calcVolumeMeasure = 'gal'
const calcMashTemp = 'F'
const grainSH = 0.2

function getThickness (mashThickness) {
  const [ratioWet, ratioDry] = mashThickness.split('/').map(x => x.trim())
  const [qt] = splitMeasure(ratioWet, 'qt')
  const [lbs] = splitMeasure(ratioDry, calcWeightMeasure)
  const thickness = qt / lbs
  return thickness
}

function strikeVolume (weight, thickness, hlt) {
  const volume = ((weight * thickness) / 4) + hlt
  return volume
}

function returnTemp (temp, srcUnit, targetUnit) {
  let target = temp
  if (srcUnit !== targetUnit) {
    target = toCelsius(temp)
  }
  return round(target, 1)
}

export default function (gristWeight, mashThickness, mashTemp, grainTemp, hltLoss) {
  let hlt = 0
  let hltu = calcVolumeMeasure
  if (hltLoss) {
    [hlt, hltu] = splitMeasure(hltLoss, calcVolumeMeasure)
  }
  const thickness = getThickness(mashThickness)
  const [grainWeight] = splitMeasure(gristWeight, calcWeightMeasure)
  const [mashT, , mashTU] = splitMeasure(mashTemp, calcMashTemp)
  const [grainT] = splitMeasure(grainTemp, calcMashTemp)
  const vol = round(strikeVolume(grainWeight, thickness, hlt), 2)
  const volTemp = (grainSH / thickness) * (mashT - grainT) + mashT

  const liquorVol = `${convert(vol).from(calcVolumeMeasure).to(hltu)} ${hltu}`
  const liquorTemp = `${returnTemp(volTemp, calcMashTemp, mashTU)} ${mashTU}`

  return [liquorVol, liquorTemp]
}
