var test = require('tap').test
var abv = require('../dist/gravity/abv').default

test('og', function (t) {
  t.equal(abv(1.069, 1.013), 7.34, 'strong beer')
  t.end()
})
