import splitMeasure from '@toddself/split-measure-units'
import round from '@toddself/round'

const calcVolumeUnit = 'gal'

export default function og (gravities, efficiency, batchVolume) {
  gravities = Array.isArray(gravities) ? gravities : [gravities]
  efficiency = efficiency > 1 ? efficiency / 100 : efficiency
  const [vol] = splitMeasure(batchVolume, calcVolumeUnit)
  const gu = gravities.reduce((total, gu) => total += gu, 0)
  return round(((gu * efficiency) / vol / 1000) + 1, 3)
}
