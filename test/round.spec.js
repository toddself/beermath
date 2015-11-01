var test = require('tap').test
var round = require('../dist/round').default

test('rounding', function (t) {
  t.equal(round(2, 0), 2, 'ok')
  t.equal(round('2', 0), 0, 'ok')
  t.equal(round({}, 0), 0, 'ok')
  t.equal(round(2.23, 1), 2.2, 'ok')
  t.equal(round(2.45, 1), 2.5, 'ok')
  t.equal(round(2.354556545434, 2), 2.35, 'ok')
  t.end()
})
