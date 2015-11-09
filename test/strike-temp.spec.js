var test = require('tap').test
var strikeTemp = require('../dist/mash/strike-temp').default

test('calculate strike with hltLoss', function (t) {
  var results = strikeTemp('12lb', '1.5qt/1lb', '154F', '62F', '2qt')
  t.equal(results[0], '5 gal', 'got back 5 gallons')
  t.equal(results[1], '166.3 F', 'got back 166.3 farhenheit')
  t.end()
})

test('calculate strike without hltLoss', function (t) {
  var results = strikeTemp('12lb', '1.5qt/1lb', '154F', '62F')
  t.equal(results[0], '4.5 gal', 'got back 4.5 gallons')
  t.equal(results[1], '166.3 F', 'got back 166.3 farhenheit')
  t.end()
})

test('calc with c', function (t) {
  var results = strikeTemp('12lb', '1.5qt/1lb', '66C', '40C')
  t.equal(results[0], '4.5 gal', 'got back 4.5 gallons')
  t.equal(results[1], '69.5 C', 'got back 69.5 degrees c')
  t.end()
})
