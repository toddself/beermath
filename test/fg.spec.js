var test = require('tap').test
var fg = require('../dist/gravity/fg').default

test('fg', function (t) {
  t.equal(fg(1.069, 77), 1.016, 'attenuation')
  t.end()
})
