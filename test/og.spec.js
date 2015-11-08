var test = require('tap').test
var og = require('../dist/gravity/og').default

test('og', function (t) {
  t.equal(og([80, 64, 304, 13], 75, '5 gal'), 1.069, 'got gravity')
  t.end()
})
