'use strict'

const convert = require('convert-units')

const tinseth = require('./tinseth-bitterness')
const rager = require('./rager-bitterness')
const garetz = require('./garetz-bitterness')

const BOIL_VOLUME_UNIT = 'gal'

module.exports = function (recipe) {
  const recipeVolume = convert(recipe.boilVolume).from(recipe.boilVolumeUnit).to(BOIL_VOLUME_UNIT)
  const fermenterVolume = convert(recipe.fermenterVolume).from(recipe.fermenterVolumeUnit).to(BOIL_VOLUME_UNIT)
  let totalRager = 0
  let totalTinseth = 0
  let totalGaretz = 0

  recipe.hops.forEach(hop => {
    const ragerIBUs = rager(hop, recipeVolume, recipe.originalGravity)
    const tinsethIBUs = tinseth(hop, recipeVolume, recipe.originalGravity)
    const targetIBU = (ragerIBUs + tinsethIBUs) / 2
    const garetzIBUs = garetz(hop, recipeVolume, recipe.originalGravity, fermenterVolume, targetIBU, 0)
    hop.ibusAdded = {
      rager: ragerIBUs,
      tinseth: tinsethIBUs,
      garetz: garetzIBUs
    }
    totalRager += ragerIBUs
    totalTinseth += tinsethIBUs
    totalGaretz += garetzIBUs
  })

  return {
    rager: totalRager,
    tinseth: totalTinseth,
    garetz: totalGaretz
  }
}
