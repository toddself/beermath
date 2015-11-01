var test = require('tap').test
var strikeTemp = require('../dist/mash/strike-temp').default

test('calculate strike with hltLoss', function (t) {
  var results = strikeTemp('12lb', '1.5qt/1lb', '154f', '62f', '2qt')
  t.equal(results[0], '5 gal', 'got back 5 gallons')
  t.equal(results[1], '166.3 f', 'got back 166.3 farhenheit')
  t.end()
})

test('calculate strike without hltLoss', function (t) {
  var results = strikeTemp('12lb', '1.5qt/1lb', '154f', '62f')
  t.equal(results[0], '4.5 gal', 'got back 4.5 gallons')
  t.equal(results[1], '166.3 f', 'got back 166.3 farhenheit')
  t.end()
})

test('calc with c', function (t) {
  var results = strikeTemp('12lb', '1.5qt/1lb', '66c', '40c')
  t.equal(results[0], '4.5 gal', 'got back 4.5 gallons')
  t.equal(results[1], '69.5 c', 'got back 69.5 degrees c')
  t.end()
})
