'use strict'

const convert = require('convert-units')
const SUCROSE_YIELD = 46
const WEIGHT_UNIT = 'lb'
const VOLUME_UNIT = 'gal'

module.exports = function calculateOriginalGravity(recipe, waterVolume, waterUnit) {
  let gravity = 0
  const batchSize = convert(waterVolume).from(waterUnit).to(VOLUME_UNIT)
  recipe.malts.forEach(malt => {
    const weight = convert(malt.weight).from(malt.weightUnit).to(WEIGHT_UNIT)
    gravity += (SUCROSE_YIELD * malt.yield) * weight
  })

  return gravity * batchSize
}
