var test = require('tap').test
var rager = require('../dist/bitterness/rager').default

test('ibus rager', function (t) {
  t.equal(rager('1.5oz', '6.5', '60min', '5gal', '1.080'), 44, '44 ibus')
  t.end()
})
