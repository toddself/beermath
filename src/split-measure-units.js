import convert from 'convert-units'
import {toFahrenheit, toCelsius} from './temp-convert'

const matcher = /^([\d.]+)\ ?(.*$)/
/**
  * splits a measurement into the number and units components
  * @method split-amount-units
  * @param {string} input the string representing the measure
  * @param {string} targetUnit a measure you wish to convert into
  * @returns {array} [amount, units]
  */
export default function (input, targetUnit) {
  const matched = input.match(matcher)

  if (!Array.isArray(matched)) {
    return [0, '']
  }

  const [, amtStr, unit] = matched
  let amount = parseFloat(amtStr)
  targetUnit = targetUnit || unit
  if (targetUnit && targetUnit !== unit) {
    if (targetUnit === 'f') {
      amount = toFahrenheit(amount)
    } else if (targetUnit === 'c') {
      amount = toCelsius(amount)
    } else {
      try {
        amount = convert(amount).from(unit).to(targetUnit)
      } catch (err) {
        return [0, '']
      }
    }
  }
  return [amount, targetUnit, unit]
}
