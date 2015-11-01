var test = require('tap').test
var garetz = require('../dist/bitterness/garetz').default

test('ibus', function (t) {
  t.equal(garetz('1.5oz', '6.5', '60 min', '5 gal', '1.080', '6 gal', '25', 0), 25, '25 ibus')
  t.end()
})
