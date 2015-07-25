'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _hand = require('../hand');

var _constants = require('../constants');

var _constants2 = _interopRequireDefault(_constants);

describe('compareHands', function () {
  it('compares high card vs. better high card', function () {
    assert.equal((0, _hand.compareHands)(['Ac', 'Td', '7h', '5s', '2c'], ['As', 'Th', '7d', '5c', '3s']), -1);
  });

  it('compares high card vs. same high card', function () {
    assert.equal((0, _hand.compareHands)(['Ac', 'Td', '7h', '5s', '3c'], ['As', 'Th', '7d', '5c', '3s']), 0);
  });

  it('compares high card vs. worse high card', function () {
    assert.equal((0, _hand.compareHands)(['Ac', 'Td', '7h', '5s', '3c'], ['As', '9h', '7d', '5c', '3s']), 1);
  });

  it('compares high card vs. pair', function () {
    assert.equal((0, _hand.compareHands)(['Ac', 'Td', '7h', '5s', '3c'], ['As', 'Ah', '7d', '5c', '3s']), -1);
  });

  it('compares pair vs. pair with better kickers', function () {
    assert.equal((0, _hand.compareHands)(['Ac', 'Ad', '7h', '5s', '2c'], ['As', 'Ah', '7d', '5c', '3s']), -1);
  });

  it('compares pair vs. same pair', function () {
    assert.equal((0, _hand.compareHands)(['Kc', 'Kd', '7h', '5s', '2c'], ['Ks', 'Kh', '7d', '5c', '2s']), 0);
  });

  it('compares pair vs. worse pair', function () {
    assert.equal((0, _hand.compareHands)(['Ac', 'Ad', '7h', '5s', '2c'], ['Js', 'Jh', '7d', '5c', '3s']), 1);
  });

  it('compares two pair vs. better two pair', function () {
    assert.equal((0, _hand.compareHands)(['Tc', 'Td', '5h', '5s', 'Ac'], ['Js', 'Jh', '3d', '3c', '2s']), -1);
  });

  it('compares two pair vs. same two pair', function () {
    assert.equal((0, _hand.compareHands)(['4c', '4d', '3h', '3s', 'Ac'], ['4s', '4h', '3d', '3c', 'As']), 0);
  });

  it('compares two pair vs. two pair with worse kicker', function () {
    assert.equal((0, _hand.compareHands)(['Tc', 'Td', '5h', '5s', 'Ac'], ['Ts', 'Th', '5d', '5c', 'Ks']), 1);
  });

  it('compares trips vs. better trips', function () {
    assert.equal((0, _hand.compareHands)(['Tc', 'Td', 'Th', 'As', 'Kc'], ['Js', 'Jh', 'Jd', '3c', '2s']), -1);
  });

  it('compares trips vs. worse trips', function () {
    assert.equal((0, _hand.compareHands)(['3c', '3d', '3h', '4s', '5c'], ['2s', '2h', '2d', 'Qc', 'Js']), 1);
  });

  it('compares straight vs. better straight', function () {
    assert.equal((0, _hand.compareHands)(['5c', '6d', '7h', '8s', '9c'], ['6s', '7h', '8d', '9c', 'Ts']), -1);
  });

  it('compares straight vs. same straight', function () {
    assert.equal((0, _hand.compareHands)(['6c', '7d', '8h', '9s', 'Tc'], ['6c', '7d', '8h', '9h', 'Td']), 0);
  });

  it('compares straight vs. worse straight', function () {
    assert.equal((0, _hand.compareHands)(['Ts', 'Jh', 'Qd', 'Kc', 'As'], ['9c', 'Td', 'Jh', 'Qs', 'Kc']), 1);
  });

  it('compares flush vs. better flush', function () {
    assert.equal((0, _hand.compareHands)(['Ac', 'Tc', '7c', '5c', '2c'], ['Ac', 'Tc', '7c', '5c', '3c']), -1);
  });

  it('compares flush vs. same flush', function () {
    assert.equal((0, _hand.compareHands)(['Ah', 'Th', '7h', '5h', '3h'], ['Ah', 'Th', '7h', '5h', '3h']), 0);
  });

  it('compares flush vs. worse flush', function () {
    assert.equal((0, _hand.compareHands)(['As', 'Ts', '7s', '5s', '3s'], ['As', '9s', '7s', '5s', '3s']), 1);
  });

  it('compares full house vs. better full house', function () {
    assert.equal((0, _hand.compareHands)(['Ac', 'Ad', 'Ah', '2s', '2c'], ['Ac', 'Ad', 'Ah', '7c', '7s']), -1);
  });

  it('compares full house vs. same full house', function () {
    assert.equal((0, _hand.compareHands)(['Ac', 'Ad', 'Ah', '2s', '2c'], ['Ac', 'Ad', 'Ah', '2c', '2s']), 0);
  });

  it('compares full house vs. worse full house', function () {
    assert.equal((0, _hand.compareHands)(['Ac', 'Ad', 'Ah', '2s', '2c'], ['Ks', 'Kh', 'Kd', 'Qc', 'Qs']), 1);
  });

  it('compares quads vs. better quads', function () {
    assert.equal((0, _hand.compareHands)(['Kc', 'Kd', 'Kh', 'Ks', 'As'], ['Ac', 'Ad', 'Ah', 'As', 'Ks']), -1);
  });

  it('compares quads vs. same quads', function () {
    assert.equal((0, _hand.compareHands)(['Kc', 'Kd', 'Kh', 'Ks', 'As'], ['Kc', 'Kd', 'Kh', 'Ks', 'As']), 0);
  });

  it('compares quads vs. worse quads', function () {
    assert.equal((0, _hand.compareHands)(['Ac', 'Ad', 'Ah', 'As', 'Jc'], ['Ac', 'Ad', 'Ah', 'As', 'Ts']), 1);
  });
});

describe('calcHand', function () {
  it('resolves high card', function () {
    var hand = ['Ac', '3d', '5h', '7s', '9c', 'Td', 'Qh'];
    assert.equal((0, _hand.calcHand)(hand).strength, _constants2['default'].HAND_HIGH);
  });

  it('resolves pair', function () {
    var hand = ['Ac', 'Ad', '5h', '7s', '9c', 'Td', 'Qh'];
    assert.equal((0, _hand.calcHand)(hand).strength, _constants2['default'].HAND_PAIR);
  });

  it('resolves two pair', function () {
    var hand = ['Ac', 'Ad', '5h', '5s', '9c', 'Td', 'Qh'];
    assert.equal((0, _hand.calcHand)(hand).strength, _constants2['default'].HAND_TWO_PAIR);
  });

  it('resolves trips', function () {
    var hand = ['Ac', 'Ad', 'Ah', '5s', '9c', 'Td', 'Qh'];
    assert.equal((0, _hand.calcHand)(hand).strength, _constants2['default'].HAND_TRIPS);
  });

  it('resolves straight', function () {
    var hand = ['2c', '3d', '4h', '5s', '6c', 'Td', 'Th'];
    assert.equal((0, _hand.calcHand)(hand).strength, _constants2['default'].HAND_STRAIGHT);
  });

  it('resolves straight (wheel)', function () {
    var hand = ['Ac', '2d', '3h', '4s', '5c', 'Td', 'Th'];
    assert.equal((0, _hand.calcHand)(hand).strength, _constants2['default'].HAND_STRAIGHT);
  });

  it('resolves straight (broadway)', function () {
    var hand = ['Tc', 'Jd', 'Qh', 'Ks', 'Ac', 'Td', 'Th'];
    assert.equal((0, _hand.calcHand)(hand).strength, _constants2['default'].HAND_STRAIGHT);
  });

  it('resolves flush', function () {
    var hand = ['Ac', '3c', '5c', '7c', '9c', 'Td', 'Th'];
    assert.equal((0, _hand.calcHand)(hand).strength, _constants2['default'].HAND_FLUSH);
  });

  it('resolves full house', function () {
    var hand = ['Ac', 'Ad', 'Ah', '5s', '5c', 'Td', 'Qh'];
    assert.equal((0, _hand.calcHand)(hand).strength, _constants2['default'].HAND_BOAT);
  });

  it('resolves quads', function () {
    var hand = ['Ac', 'Ad', 'Ah', 'As', '5c', 'Td', 'Th'];
    assert.equal((0, _hand.calcHand)(hand).strength, _constants2['default'].HAND_QUADS);
  });

  it('resolves straight flush', function () {
    var hand = ['2c', '3c', '4c', '5c', '6c', 'Td', 'Th'];
    assert.equal((0, _hand.calcHand)(hand).strength, _constants2['default'].HAND_STR_FLUSH);
  });

  it('resolves straight flush (wheel)', function () {
    var hand = ['Ad', '2d', '3d', '4d', '5d', 'Th', 'Ts'];
    assert.equal((0, _hand.calcHand)(hand).strength, _constants2['default'].HAND_STR_FLUSH);
  });

  it('resolves straight flush (broadway)', function () {
    // Broadway.
    var hand = ['Th', 'Jh', 'Qh', 'Kh', 'Ah', 'Ts', 'Tc'];
    assert.equal((0, _hand.calcHand)(hand).strength, _constants2['default'].HAND_STR_FLUSH);
  });
});