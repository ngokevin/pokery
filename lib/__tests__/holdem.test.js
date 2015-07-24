'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _chai = require('chai');

var _holdem = require('../holdem');

var _constants = require('../constants');

var _constants2 = _interopRequireDefault(_constants);

function _createHand(cards, withStrength) {
  // List of rank-suits (['4s', 'Kd']) to list of Cards.
  var ranks = { '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8,
    '9': 9, 'T': 10, 'J': 11, 'Q': 12, 'K': 13, 'A': 14 };
  var hand = cards.map(function (card) {
    return {
      rank: ranks[card[0]],
      suit: card[1]
    };
  });

  // Also calculate handStrength if specified, five-card hand only.
  return hand;
}

describe('calcHand', function () {
  it('resolves high card', function () {
    var hand = _createHand(['Ac', '3d', '5h', '7s', '9c', 'Td', 'Qh']);
    _chai.assert.equal((0, _holdem.calcHand)(hand).strength, _constants2['default'].HAND_HIGH);
  });

  it('resolves pair', function () {
    var hand = _createHand(['Ac', 'Ad', '5h', '7s', '9c', 'Td', 'Qh']);
    _chai.assert.equal((0, _holdem.calcHand)(hand).strength, _constants2['default'].HAND_PAIR);
  });

  it('resolves two pair', function () {
    var hand = _createHand(['Ac', 'Ad', '5h', '5s', '9c', 'Td', 'Qh']);
    _chai.assert.equal((0, _holdem.calcHand)(hand).strength, _constants2['default'].HAND_TWO_PAIR);
  });

  it('resolves trips', function () {
    var hand = _createHand(['Ac', 'Ad', 'Ah', '5s', '9c', 'Td', 'Qh']);
    _chai.assert.equal((0, _holdem.calcHand)(hand).strength, _constants2['default'].HAND_TRIPS);
  });

  it('resolves straight', function () {
    var hand = _createHand(['2c', '3d', '4h', '5s', '6c', 'Td', 'Th']);
    _chai.assert.equal((0, _holdem.calcHand)(hand).strength, _constants2['default'].HAND_STRAIGHT);
  });

  it('resolves straight (wheel)', function () {
    var hand = _createHand(['Ac', '2d', '3h', '4s', '5c', 'Td', 'Th']);
    _chai.assert.equal((0, _holdem.calcHand)(hand).strength, _constants2['default'].HAND_STRAIGHT);
  });

  it('resolves straight (broadway)', function () {
    var hand = _createHand(['Tc', 'Jd', 'Qh', 'Ks', 'Ac', 'Td', 'Th']);
    _chai.assert.equal((0, _holdem.calcHand)(hand).strength, _constants2['default'].HAND_STRAIGHT);
  });

  it('resolves flush', function () {
    var hand = _createHand(['Ac', '3c', '5c', '7c', '9c', 'Td', 'Th']);
    _chai.assert.equal((0, _holdem.calcHand)(hand).strength, _constants2['default'].HAND_FLUSH);
  });

  it('resolves full house', function () {
    var hand = _createHand(['Ac', 'Ad', 'Ah', '5s', '5c', 'Td', 'Qh']);
    _chai.assert.equal((0, _holdem.calcHand)(hand).strength, _constants2['default'].HAND_BOAT);
  });

  it('resolves quads', function () {
    var hand = _createHand(['Ac', 'Ad', 'Ah', 'As', '5c', 'Td', 'Th']);
    _chai.assert.equal((0, _holdem.calcHand)(hand).strength, _constants2['default'].HAND_QUADS);
  });

  it('resolves straight flush', function () {
    var hand = _createHand(['2c', '3c', '4c', '5c', '6c', 'Td', 'Th']);
    _chai.assert.equal((0, _holdem.calcHand)(hand).strength, _constants2['default'].HAND_STR_FLUSH);
  });

  it('resolves straight flush (wheel)', function () {
    var hand = _createHand(['Ad', '2d', '3d', '4d', '5d', 'Th', 'Ts']);
    _chai.assert.equal((0, _holdem.calcHand)(hand).strength, _constants2['default'].HAND_STR_FLUSH);
  });

  it('resolves straight flush (broadway)', function () {
    // Broadway.
    var hand = _createHand(['Th', 'Jh', 'Qh', 'Kh', 'Ah', 'Ts', 'Tc']);
    _chai.assert.equal((0, _holdem.calcHand)(hand).strength, _constants2['default'].HAND_STR_FLUSH);
  });
});

describe('compareHands', function () {
  it('compares high card vs. better high card', function () {
    _chai.assert.equal((0, _holdem.compareHands)(_createHand(['Ac', 'Td', '7h', '5s', '2c']), _createHand(['As', 'Th', '7d', '5c', '3s'])), -1);
  });

  it('compares high card vs. same high card', function () {
    _chai.assert.equal((0, _holdem.compareHands)(_createHand(['Ac', 'Td', '7h', '5s', '3c']), _createHand(['As', 'Th', '7d', '5c', '3s'])), 0);
  });

  it('compares high card vs. worse high card', function () {
    _chai.assert.equal((0, _holdem.compareHands)(_createHand(['Ac', 'Td', '7h', '5s', '3c']), _createHand(['As', '9h', '7d', '5c', '3s'])), 1);
  });

  it('compares pair vs. pair with better kickers', function () {
    _chai.assert.equal((0, _holdem.compareHands)(_createHand(['Ac', 'Ad', '7h', '5s', '2c']), _createHand(['As', 'Ah', '7d', '5c', '3s'])), -1);
  });

  it('compares pair vs. same pair', function () {
    _chai.assert.equal((0, _holdem.compareHands)(_createHand(['Kc', 'Kd', '7h', '5s', '2c']), _createHand(['Ks', 'Kh', '7d', '5c', '2s'])), 0);
  });

  it('compares pair vs. worse pair', function () {
    _chai.assert.equal((0, _holdem.compareHands)(_createHand(['Ac', 'Ad', '7h', '5s', '2c']), _createHand(['Js', 'Jh', '7d', '5c', '3s'])), 1);
  });

  it('compares two pair vs. better two pair', function () {
    _chai.assert.equal((0, _holdem.compareHands)(_createHand(['Tc', 'Td', '5h', '5s', 'Ac']), _createHand(['Js', 'Jh', '3d', '3c', '2s'])), -1);
  });

  it('compares two pair vs. same two pair', function () {
    _chai.assert.equal((0, _holdem.compareHands)(_createHand(['4c', '4d', '3h', '3s', 'Ac']), _createHand(['4s', '4h', '3d', '3c', 'As'])), 0);
  });

  it('compares two pair vs. two pair with worse kicker', function () {
    _chai.assert.equal((0, _holdem.compareHands)(_createHand(['Tc', 'Td', '5h', '5s', 'Ac']), _createHand(['Ts', 'Th', '5d', '5c', 'Ks'])), 1);
  });

  it('compares trips vs. better trips', function () {
    _chai.assert.equal((0, _holdem.compareHands)(_createHand(['Tc', 'Td', 'Th', 'As', 'Kc']), _createHand(['Js', 'Jh', 'Jd', '3c', '2s'])), -1);
  });

  it('compares trips vs. worse trips', function () {
    _chai.assert.equal((0, _holdem.compareHands)(_createHand(['3c', '3d', '3h', '4s', '5c']), _createHand(['2s', '2h', '2d', 'Qc', 'Js'])), 1);
  });

  it('compares straight vs. better straight', function () {
    _chai.assert.equal((0, _holdem.compareHands)(_createHand(['5c', '6d', '7h', '8s', '9c']), _createHand(['6s', '7h', '8d', '9c', 'Ts'])), -1);
  });

  it('compares straight vs. same straight', function () {
    _chai.assert.equal((0, _holdem.compareHands)(_createHand(['6c', '7d', '8h', '9s', 'Tc']), _createHand(['6c', '7d', '8h', '9h', 'Td'])), 0);
  });

  it('compares straight vs. worse straight', function () {
    _chai.assert.equal((0, _holdem.compareHands)(_createHand(['Ts', 'Jh', 'Qd', 'Kc', 'As']), _createHand(['9c', 'Td', 'Jh', 'Qs', 'Kc'])), 1);
  });

  it('compares flush vs. better flush', function () {
    _chai.assert.equal((0, _holdem.compareHands)(_createHand(['Ac', 'Tc', '7c', '5c', '2c']), _createHand(['Ac', 'Tc', '7c', '5c', '3c'])), -1);
  });

  it('compares flush vs. same flush', function () {
    _chai.assert.equal((0, _holdem.compareHands)(_createHand(['Ah', 'Th', '7h', '5h', '3h']), _createHand(['Ah', 'Th', '7h', '5h', '3h'])), 0);
  });

  it('compares flush vs. worse flush', function () {
    _chai.assert.equal((0, _holdem.compareHands)(_createHand(['As', 'Ts', '7s', '5s', '3s']), _createHand(['As', '9s', '7s', '5s', '3s'])), 1);
  });

  it('compares full house vs. better full house', function () {
    _chai.assert.equal((0, _holdem.compareHands)(_createHand(['Ac', 'Ad', 'Ah', '2s', '2c']), _createHand(['Ac', 'Ad', 'Ah', '7c', '7s'])), -1);
  });

  it('compares full house vs. same full house', function () {
    _chai.assert.equal((0, _holdem.compareHands)(_createHand(['Ac', 'Ad', 'Ah', '2s', '2c']), _createHand(['Ac', 'Ad', 'Ah', '2c', '2s'])), 0);
  });

  it('compares full house vs. worse full house', function () {
    _chai.assert.equal((0, _holdem.compareHands)(_createHand(['Ac', 'Ad', 'Ah', '2s', '2c']), _createHand(['Ks', 'Kh', 'Kd', 'Qc', 'Qs'])), 1);
  });

  it('compares quads vs. better quads', function () {
    _chai.assert.equal((0, _holdem.compareHands)(_createHand(['Kc', 'Kd', 'Kh', 'Ks', 'As']), _createHand(['Ac', 'Ad', 'Ah', 'As', 'Ks'])), -1);
  });

  it('compares quads vs. same quads', function () {
    _chai.assert.equal((0, _holdem.compareHands)(_createHand(['Kc', 'Kd', 'Kh', 'Ks', 'As']), _createHand(['Kc', 'Kd', 'Kh', 'Ks', 'As'])), 0);
  });

  it('compares quads vs. worse quads', function () {
    _chai.assert.equal((0, _holdem.compareHands)(_createHand(['Ac', 'Ad', 'Ah', 'As', 'Jc']), _createHand(['Ac', 'Ad', 'Ah', 'As', 'Ts'])), 1);
  });
});