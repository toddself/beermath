var test = require('tap').test
var splitMeasure = require('../dist/split-measure-units').default

test('splits strings without spaces', function (t) {
  var results = splitMeasure('12gal')
  t.equal(results[0], 12, 'split amount')
  t.equal(results[1], 'gal', 'split units')
  t.equal(results[2], 'gal', 'split units')
  t.end()
})

test('splits strings with spaces', function (t) {
  var results = splitMeasure('54.4 qt')
  t.equal(results[0], 54.4, 'split amount')
  t.equal(results[1], 'qt', 'splut units')
  t.equal(results[2], 'qt', 'split units')
  t.end()
})

test('split & convert', function (t) {
  var results = splitMeasure('1gal', 'qt')
  t.equal(results[0], 4, '4 quarts make a gallon')
  t.equal(results[1], 'qt', 'we wanted quarts')
  t.equal(results[2], 'gal', 'but we gave gallons')
  t.end()
})

test('deal with squirrely input', function (t) {
  var results = splitMeasure('lemons')
  t.equal(results[0], 0, 'no amount')
  t.equal(results[1], '', 'no unit')
  t.end()
})

test('deal with invalid units', function (t) {
  var results = splitMeasure('1gals', 'qt')
  t.equal(results[0], 0, 'no amount')
  t.equal(results[1], '', 'no unit')
  t.end()
})

test('converts to fahrenheit', function (t) {
  var results = splitMeasure('50c', 'f')
  t.equal(results[0], 122, 'converted to f')
  t.equal(results[1], 'f', 'got back f')
  t.end()
})

test('converts to celsius', function (t) {
  var results = splitMeasure('100f', 'c')
  t.equal(Math.round(results[0]), Math.round(37.7), 'converted')
  t.equal(results[1], 'c', 'got back c')
  t.end()
})
