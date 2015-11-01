var test = require('tap').test
var tinseth = require('../dist/bitterness/tinseth').default

test('ibus', function (t) {
  t.equal(tinseth('1.5oz', '6.4', '60 min', '5gal', '1.080'), 25, '25 ibus')
  t.equal(tinseth('1oz', '4.6', '15 min', '5gal', '1.080'), 6, '6 ibus')
  t.end()
})
