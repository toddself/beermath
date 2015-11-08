import round from '@toddself/round'

export default function fg (og, attenuation) {
  attenuation = attenuation > 1 ? attenuation / 100 : attenuation
  return round(og - (og - 1) * attenuation, 3)
}
