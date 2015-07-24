import {assert} from 'chai';

import {calcHand, compareHands, getHandStrength} from '../holdem';
import c from '../constants';


function _createHand(cards, withStrength) {
  // List of rank-suits (['4s', 'Kd']) to list of Cards.
  const ranks = {'2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8,
                 '9': 9, 'T': 10, 'J': 11, 'Q': 12, 'K': 13, 'A': 14};
  const hand = cards.map(card => ({
    rank: ranks[card[0]],
    suit: card[1]
  }));

  // Also calculate handStrength if specified, five-card hand only.
  return withStrength ? getHandStrength(hand) : hand;
}


describe('calcHand', () => {
  it('resolves high card', () => {
    const hand = _createHand(['Ac', '3d', '5h', '7s', '9c', 'Td', 'Qh']);
    assert.equal(calcHand(hand).strength, c.HAND_HIGH);
  });

  it('resolves pair', () => {
    const hand = _createHand(['Ac', 'Ad', '5h', '7s', '9c', 'Td', 'Qh']);
    assert.equal(calcHand(hand).strength, c.HAND_PAIR);
  });

  it('resolves two pair', () => {
    const hand = _createHand(['Ac', 'Ad', '5h', '5s', '9c', 'Td', 'Qh']);
    assert.equal(calcHand(hand).strength, c.HAND_TWO_PAIR);
  });

  it('resolves trips', () => {
    const hand = _createHand(['Ac', 'Ad', 'Ah', '5s', '9c', 'Td', 'Qh']);
    assert.equal(calcHand(hand).strength, c.HAND_TRIPS);
  });

  it('resolves straight', () => {
    const hand = _createHand(['2c', '3d', '4h', '5s', '6c', 'Td', 'Th']);
    assert.equal(calcHand(hand).strength, c.HAND_STRAIGHT);
  });

  it('resolves straight (wheel)', () => {
    const hand = _createHand(['Ac', '2d', '3h', '4s', '5c', 'Td', 'Th']);
    assert.equal(calcHand(hand).strength, c.HAND_STRAIGHT);
  });

  it('resolves straight (broadway)', () => {
    const hand = _createHand(['Tc', 'Jd', 'Qh', 'Ks', 'Ac', 'Td', 'Th']);
    assert.equal(calcHand(hand).strength, c.HAND_STRAIGHT);
  });

  it('resolves flush', () => {
    const hand = _createHand(['Ac', '3c', '5c', '7c', '9c', 'Td', 'Th']);
    assert.equal(calcHand(hand).strength, c.HAND_FLUSH);
  });

  it('resolves full house', () => {
    const hand = _createHand(['Ac', 'Ad', 'Ah', '5s', '5c', 'Td', 'Qh']);
    assert.equal(calcHand(hand).strength, c.HAND_BOAT);
  });

  it('resolves quads', () => {
    const hand = _createHand(['Ac', 'Ad', 'Ah', 'As', '5c', 'Td', 'Th']);
    assert.equal(calcHand(hand).strength, c.HAND_QUADS);
  });

  it('resolves straight flush', () => {
    const hand = _createHand(['2c', '3c', '4c', '5c', '6c', 'Td', 'Th']);
    assert.equal(calcHand(hand).strength, c.HAND_STR_FLUSH);
  });

  it('resolves straight flush (wheel)', () => {
    const hand = _createHand(['Ad', '2d', '3d', '4d', '5d', 'Th', 'Ts']);
    assert.equal(calcHand(hand).strength, c.HAND_STR_FLUSH);
  });

  it('resolves straight flush (broadway)', () => {
    // Broadway.
    const hand = _createHand(['Th', 'Jh', 'Qh', 'Kh', 'Ah', 'Ts', 'Tc']);
    assert.equal(calcHand(hand).strength, c.HAND_STR_FLUSH);
  });
});


describe('compareHands', () => {
  it('compares high card vs. better high card', () => {
    assert.equal(compareHands(
      _createHand(['Ac', 'Td', '7h', '5s', '2c'], true),
      _createHand(['As', 'Th', '7d', '5c', '3s'], true)
    ), -1);
  });

  it('compares high card vs. same high card', () => {
    assert.equal(compareHands(
      _createHand(['Ac', 'Td', '7h', '5s', '3c'], true),
      _createHand(['As', 'Th', '7d', '5c', '3s'], true)
    ), 0);
  });

  it('compares high card vs. worse high card', () => {
    assert.equal(compareHands(
      _createHand(['Ac', 'Td', '7h', '5s', '3c'], true),
      _createHand(['As', '9h', '7d', '5c', '3s'], true)
    ), 1);
  });

  it('compares pair vs. pair with better kickers', () => {
    assert.equal(compareHands(
      _createHand(['Ac', 'Ad', '7h', '5s', '2c'], true),
      _createHand(['As', 'Ah', '7d', '5c', '3s'], true)
    ), -1);
  });

  it('compares pair vs. same pair', () => {
    assert.equal(compareHands(
      _createHand(['Kc', 'Kd', '7h', '5s', '2c'], true),
      _createHand(['Ks', 'Kh', '7d', '5c', '2s'], true)
    ), 0);
  });

  it('compares pair vs. worse pair', () => {
    assert.equal(compareHands(
      _createHand(['Ac', 'Ad', '7h', '5s', '2c'], true),
      _createHand(['Js', 'Jh', '7d', '5c', '3s'], true)
    ), 1);
  });

  it('compares two pair vs. better two pair', () => {
    assert.equal(compareHands(
      _createHand(['Tc', 'Td', '5h', '5s', 'Ac'], true),
      _createHand(['Js', 'Jh', '3d', '3c', '2s'], true)
    ), -1);
  });

  it('compares two pair vs. same two pair', () => {
    assert.equal(compareHands(
      _createHand(['4c', '4d', '3h', '3s', 'Ac'], true),
      _createHand(['4s', '4h', '3d', '3c', 'As'], true)
    ), 0);
  });

  it('compares two pair vs. two pair with worse kicker', () => {
    assert.equal(compareHands(
      _createHand(['Tc', 'Td', '5h', '5s', 'Ac'], true),
      _createHand(['Ts', 'Th', '5d', '5c', 'Ks'], true)
    ), 1);
  });

  it('compares trips vs. better trips', () => {
    assert.equal(compareHands(
      _createHand(['Tc', 'Td', 'Th', 'As', 'Kc'], true),
      _createHand(['Js', 'Jh', 'Jd', '3c', '2s'], true)
    ), -1);
  });

  it('compares trips vs. worse trips', () => {
    assert.equal(compareHands(
      _createHand(['3c', '3d', '3h', '4s', '5c'], true),
      _createHand(['2s', '2h', '2d', 'Qc', 'Js'], true)
    ), 1);
  });

  it('compares straight vs. better straight', () => {
    assert.equal(compareHands(
      _createHand(['5c', '6d', '7h', '8s', '9c'], true),
      _createHand(['6s', '7h', '8d', '9c', 'Ts'], true)
    ), -1);
  });

  it('compares straight vs. same straight', () => {
    assert.equal(compareHands(
      _createHand(['6c', '7d', '8h', '9s', 'Tc'], true),
      _createHand(['6c', '7d', '8h', '9h', 'Td'], true)
    ), 0);
  });

  it('compares straight vs. worse straight', () => {
    assert.equal(compareHands(
      _createHand(['Ts', 'Jh', 'Qd', 'Kc', 'As'], true),
      _createHand(['9c', 'Td', 'Jh', 'Qs', 'Kc'], true)
    ), 1);
  });

  it('compares flush vs. better flush', () => {
    assert.equal(compareHands(
      _createHand(['Ac', 'Tc', '7c', '5c', '2c'], true),
      _createHand(['Ac', 'Tc', '7c', '5c', '3c'], true)
    ), -1);
  });

  it('compares flush vs. same flush', () => {
    assert.equal(compareHands(
      _createHand(['Ah', 'Th', '7h', '5h', '3h'], true),
      _createHand(['Ah', 'Th', '7h', '5h', '3h'], true)
    ), 0);
  });

  it('compares flush vs. worse flush', () => {
    assert.equal(compareHands(
      _createHand(['As', 'Ts', '7s', '5s', '3s'], true),
      _createHand(['As', '9s', '7s', '5s', '3s'], true)
    ), 1);
  });

  it('compares full house vs. better full house', () => {
    assert.equal(compareHands(
      _createHand(['Ac', 'Ad', 'Ah', '2s', '2c'], true),
      _createHand(['Ac', 'Ad', 'Ah', '7c', '7s'], true)
    ), -1);
  });

  it('compares full house vs. same full house', () => {
    assert.equal(compareHands(
      _createHand(['Ac', 'Ad', 'Ah', '2s', '2c'], true),
      _createHand(['Ac', 'Ad', 'Ah', '2c', '2s'], true)
    ), 0);
  });

  it('compares full house vs. worse full house', () => {
    assert.equal(compareHands(
      _createHand(['Ac', 'Ad', 'Ah', '2s', '2c'], true),
      _createHand(['Ks', 'Kh', 'Kd', 'Qc', 'Qs'], true)
    ), 1);
  });

  it('compares quads vs. better quads', () => {
    assert.equal(compareHands(
      _createHand(['Kc', 'Kd', 'Kh', 'Ks', 'As'], true),
      _createHand(['Ac', 'Ad', 'Ah', 'As', 'Ks'], true)
    ), -1);
  });

  it('compares quads vs. same quads', () => {
    assert.equal(compareHands(
      _createHand(['Kc', 'Kd', 'Kh', 'Ks', 'As'], true),
      _createHand(['Kc', 'Kd', 'Kh', 'Ks', 'As'], true)
    ), 0);
  });

  it('compares quads vs. worse quads', () => {
    assert.equal(compareHands(
      _createHand(['Ac', 'Ad', 'Ah', 'As', 'Jc'], true),
      _createHand(['Ac', 'Ad', 'Ah', 'As', 'Ts'], true)
    ), 1);
  });
});
