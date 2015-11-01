var test = require('tap').test
var infusion = require('../dist/mash/infusion').default

test('raising temp', function (t) {
  t.equal(infusion('104f', '140f', '8qt', '8lb'), '4.9 qt', '4.9 quarts')
  t.end()
})
