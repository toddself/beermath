import round from '@toddself/round'

export default function abv (og, fg) {
  return round((og - fg) * 131, 2)
}
