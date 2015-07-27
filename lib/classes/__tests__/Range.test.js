'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _Range = require('../Range');

var _Range2 = _interopRequireDefault(_Range);

describe('Range', function () {
  it('generates defined hand', function () {
    var range = new _Range2['default']('Ah2d');
    var possibleHands = [['Ah', '2d']];
    assertDeepInclude(possibleHands, range.get());
  });

  it('generates suited hand', function () {
    var range = new _Range2['default']('AQs');
    var possibleHands = c.SUITS.map(function (suit) {
      return ['A' + suit, 'Q' + suit];
    });
    for (var i = 0; i < 6; i++) {
      assertDeepInclude(possibleHands, range.get());
    }
  });

  it('generates rank-only hand', function () {
    var range = new _Range2['default']('AQ');
    var possibleHands = [];
    c.SUITS.forEach(function (suitA) {
      c.SUITS.forEach(function (suitB) {
        possibleHands.push(['A' + suitA, 'Q' + suitB]);
      });
    });
    for (var i = 0; i < 24; i++) {
      assertDeepInclude(possibleHands, range.get());
    }
  });

  it('toString', function () {
    assert.equal(new _Range2['default']('5h2d'), '5h2d');
    assert.equal(new _Range2['default']('AQs'), 'AQs');
    assert.equal(new _Range2['default']('AQ'), 'AQ');
  });
});