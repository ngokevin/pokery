'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _Hand = require('../Hand');

var _Hand2 = _interopRequireDefault(_Hand);

describe('Hand.constructor', function () {
  it('reduces to high card', function () {
    var hand = new _Hand2['default'](['Ac', '3d', '5h', '7s', '9c', 'Td', 'Qh']);
    assert.equal(hand.strength, c.HAND_HIGH);
  });

  it('reduces to pair', function () {
    var hand = new _Hand2['default'](['Ac', 'Ad', '5h', '7s', '9c', 'Td', 'Qh']);
    assert.equal(hand.strength, c.HAND_PAIR);
  });

  it('reduces to two pair', function () {
    var hand = new _Hand2['default'](['Ac', 'Ad', '5h', '5s', '9c', 'Td', 'Qh']);
    assert.equal(hand.strength, c.HAND_TWO_PAIR);
  });

  it('reduces to trips', function () {
    var hand = new _Hand2['default'](['Ac', 'Ad', 'Ah', '5s', '9c', 'Td', 'Qh']);
    assert.equal(hand.strength, c.HAND_TRIPS);
  });

  it('reduces to straight', function () {
    var hand = new _Hand2['default'](['2c', '3d', '4h', '5s', '6c', 'Td', 'Th']);
    assert.equal(hand.strength, c.HAND_STRAIGHT);
  });

  it('reduces to straight (wheel)', function () {
    var hand = new _Hand2['default'](['Ac', '2d', '3h', '4s', '5c', 'Td', 'Th']);
    assert.equal(hand.strength, c.HAND_STRAIGHT);
  });

  it('reduces to straight (broadway)', function () {
    var hand = new _Hand2['default'](['Tc', 'Jd', 'Qh', 'Ks', 'Ac', 'Td', 'Th']);
    assert.equal(hand.strength, c.HAND_STRAIGHT);
  });

  it('reduces to flush', function () {
    var hand = new _Hand2['default'](['Ac', '3c', '5c', '7c', '9c', 'Td', 'Th']);
    assert.equal(hand.strength, c.HAND_FLUSH);
  });

  it('reduces to full house', function () {
    var hand = new _Hand2['default'](['Ac', 'Ad', 'Ah', '5s', '5c', 'Td', 'Qh']);
    assert.equal(hand.strength, c.HAND_BOAT);
  });

  it('reduces to quads', function () {
    var hand = new _Hand2['default'](['Ac', 'Ad', 'Ah', 'As', '5c', 'Td', 'Th']);
    assert.equal(hand.strength, c.HAND_QUADS);
  });

  it('reduces to straight flush', function () {
    var hand = new _Hand2['default'](['2c', '3c', '4c', '5c', '6c', 'Td', 'Th']);
    assert.equal(hand.strength, c.HAND_STR_FLUSH);
  });

  it('reduces to straight flush (wheel)', function () {
    var hand = new _Hand2['default'](['Ad', '2d', '3d', '4d', '5d', 'Th', 'Ts']);
    assert.equal(hand.strength, c.HAND_STR_FLUSH);
  });

  it('reduces to straight flush (broadway)', function () {
    // Broadway.
    var hand = new _Hand2['default'](['Th', 'Jh', 'Qh', 'Kh', 'Ah', 'Ts', 'Tc']);
    assert.equal(hand.strength, c.HAND_STR_FLUSH);
  });
});

describe('Hand.vs', function () {
  it('compares high card vs. better high card', function () {
    assert.equal(new _Hand2['default'](['Ac', 'Td', '7h', '5s', '2c']).vs(new _Hand2['default'](['As', 'Th', '7d', '5c', '3s'])), -1);
  });

  it('compares high card vs. same high card', function () {
    assert.equal(new _Hand2['default'](['Ac', 'Td', '7h', '5s', '3c']).vs(new _Hand2['default'](['As', 'Th', '7d', '5c', '3s'])), 0);
  });

  it('compares high card vs. worse high card', function () {
    assert.equal(new _Hand2['default'](['Ac', 'Td', '7h', '5s', '3c']).vs(new _Hand2['default'](['As', '9h', '7d', '5c', '3s'])), 1);
  });

  it('compares high card vs. pair', function () {
    assert.equal(new _Hand2['default'](['Ac', 'Td', '7h', '5s', '3c']).vs(new _Hand2['default'](['As', 'Ah', '7d', '5c', '3s'])), -1);
  });

  it('compares pair vs. pair with better kickers', function () {
    assert.equal(new _Hand2['default'](['Ac', 'Ad', '7h', '5s', '2c']).vs(new _Hand2['default'](['As', 'Ah', '7d', '5c', '3s'])), -1);
  });

  it('compares pair vs. same pair', function () {
    assert.equal(new _Hand2['default'](['Kc', 'Kd', '7h', '5s', '2c']).vs(new _Hand2['default'](['Ks', 'Kh', '7d', '5c', '2s'])), 0);
  });

  it('compares pair vs. worse pair', function () {
    assert.equal(new _Hand2['default'](['Ac', 'Ad', '7h', '5s', '2c']).vs(new _Hand2['default'](['Js', 'Jh', '7d', '5c', '3s'])), 1);
  });

  it('compares two pair vs. better two pair', function () {
    assert.equal(new _Hand2['default'](['Tc', 'Td', '5h', '5s', 'Ac']).vs(new _Hand2['default'](['Js', 'Jh', '3d', '3c', '2s'])), -1);
  });

  it('compares two pair vs. same two pair', function () {
    assert.equal(new _Hand2['default'](['4c', '4d', '3h', '3s', 'Ac']).vs(new _Hand2['default'](['4s', '4h', '3d', '3c', 'As'])), 0);
  });

  it('compares two pair vs. two pair with worse kicker', function () {
    assert.equal(new _Hand2['default'](['Tc', 'Td', '5h', '5s', 'Ac']).vs(new _Hand2['default'](['Ts', 'Th', '5d', '5c', 'Ks'])), 1);
  });

  it('compares trips vs. better trips', function () {
    assert.equal(new _Hand2['default'](['Tc', 'Td', 'Th', 'As', 'Kc']).vs(new _Hand2['default'](['Js', 'Jh', 'Jd', '3c', '2s'])), -1);
  });

  it('compares trips vs. worse trips', function () {
    assert.equal(new _Hand2['default'](['3c', '3d', '3h', '4s', '5c']).vs(new _Hand2['default'](['2s', '2h', '2d', 'Qc', 'Js'])), 1);
  });

  it('compares straight vs. better straight', function () {
    assert.equal(new _Hand2['default'](['5c', '6d', '7h', '8s', '9c']).vs(new _Hand2['default'](['6s', '7h', '8d', '9c', 'Ts'])), -1);
  });

  it('compares straight vs. same straight', function () {
    assert.equal(new _Hand2['default'](['6c', '7d', '8h', '9s', 'Tc']).vs(new _Hand2['default'](['6c', '7d', '8h', '9h', 'Td'])), 0);
  });

  it('compares straight vs. worse straight', function () {
    assert.equal(new _Hand2['default'](['Ts', 'Jh', 'Qd', 'Kc', 'As']).vs(new _Hand2['default'](['9c', 'Td', 'Jh', 'Qs', 'Kc'])), 1);
  });

  it('compares flush vs. better flush', function () {
    assert.equal(new _Hand2['default'](['Ac', 'Tc', '7c', '5c', '2c']).vs(new _Hand2['default'](['Ac', 'Tc', '7c', '5c', '3c'])), -1);
  });

  it('compares flush vs. same flush', function () {
    assert.equal(new _Hand2['default'](['Ah', 'Th', '7h', '5h', '3h']).vs(new _Hand2['default'](['Ah', 'Th', '7h', '5h', '3h'])), 0);
  });

  it('compares flush vs. worse flush', function () {
    assert.equal(new _Hand2['default'](['As', 'Ts', '7s', '5s', '3s']).vs(new _Hand2['default'](['As', '9s', '7s', '5s', '3s'])), 1);
  });

  it('compares full house vs. better full house', function () {
    assert.equal(new _Hand2['default'](['Ac', 'Ad', 'Ah', '2s', '2c']).vs(new _Hand2['default'](['Ac', 'Ad', 'Ah', '7c', '7s'])), -1);
  });

  it('compares full house vs. same full house', function () {
    assert.equal(new _Hand2['default'](['Ac', 'Ad', 'Ah', '2s', '2c']).vs(new _Hand2['default'](['Ac', 'Ad', 'Ah', '2c', '2s'])), 0);
  });

  it('compares full house vs. worse full house', function () {
    assert.equal(new _Hand2['default'](['Ac', 'Ad', 'Ah', '2s', '2c']).vs(new _Hand2['default'](['Ks', 'Kh', 'Kd', 'Qc', 'Qs'])), 1);
  });

  it('compares quads vs. better quads', function () {
    assert.equal(new _Hand2['default'](['Kc', 'Kd', 'Kh', 'Ks', 'As']).vs(new _Hand2['default'](['Ac', 'Ad', 'Ah', 'As', 'Ks'])), -1);
  });

  it('compares quads vs. same quads', function () {
    assert.equal(new _Hand2['default'](['Kc', 'Kd', 'Kh', 'Ks', 'As']).vs(new _Hand2['default'](['Kc', 'Kd', 'Kh', 'Ks', 'As'])), 0);
  });

  it('compares quads vs. worse quads', function () {
    assert.equal(new _Hand2['default'](['Ac', 'Ad', 'Ah', 'As', 'Jc']).vs(new _Hand2['default'](['Ac', 'Ad', 'Ah', 'As', 'Ts'])), 1);
  });
});