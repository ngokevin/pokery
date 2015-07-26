'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _HoleCards = require('../HoleCards');

var _HoleCards2 = _interopRequireDefault(_HoleCards);

describe('HoleCards', function () {
  it('generates defined hand', function () {
    var cards = new _HoleCards2['default']('Ah2d');
    var range = [['Ah', '2d']];
    assertDeepInclude(range, cards.get());
  });

  it('generates suited hand', function () {
    var cards = new _HoleCards2['default']('AQs');
    var range = c.SUITS.map(function (suit) {
      return ['A' + suit, 'Q' + suit];
    });
    for (var i = 0; i < 6; i++) {
      assertDeepInclude(range, cards.get());
    }
  });

  it('generates rank-only hand', function () {
    var cards = new _HoleCards2['default']('AQ');
    var range = [];
    c.SUITS.forEach(function (suitA) {
      c.SUITS.forEach(function (suitB) {
        range.push(['A' + suitA, 'Q' + suitB]);
      });
    });
    for (var i = 0; i < 24; i++) {
      assertDeepInclude(range, cards.get());
    }
  });

  it('toString', function () {
    assert.equal(new _HoleCards2['default']('5h2d'), '5h2d');
    assert.equal(new _HoleCards2['default']('AQs'), 'AQs');
    assert.equal(new _HoleCards2['default']('AQ'), 'AQ');
  });
});