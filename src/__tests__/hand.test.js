import {calcHand, compareHands} from '../hand';
import c from '../constants';


describe('compareHands', () => {
  it('compares high card vs. better high card', () => {
    assert.equal(compareHands(
      ['Ac', 'Td', '7h', '5s', '2c'],
      ['As', 'Th', '7d', '5c', '3s']
    ), -1);
  });

  it('compares high card vs. same high card', () => {
    assert.equal(compareHands(
      ['Ac', 'Td', '7h', '5s', '3c'],
      ['As', 'Th', '7d', '5c', '3s']
    ), 0);
  });

  it('compares high card vs. worse high card', () => {
    assert.equal(compareHands(
      ['Ac', 'Td', '7h', '5s', '3c'],
      ['As', '9h', '7d', '5c', '3s']
    ), 1);
  });

  it('compares high card vs. pair', () => {
    assert.equal(compareHands(
      ['Ac', 'Td', '7h', '5s', '3c'],
      ['As', 'Ah', '7d', '5c', '3s']
    ), -1);
  });

  it('compares pair vs. pair with better kickers', () => {
    assert.equal(compareHands(
      ['Ac', 'Ad', '7h', '5s', '2c'],
      ['As', 'Ah', '7d', '5c', '3s']
    ), -1);
  });

  it('compares pair vs. same pair', () => {
    assert.equal(compareHands(
      ['Kc', 'Kd', '7h', '5s', '2c'],
      ['Ks', 'Kh', '7d', '5c', '2s']
    ), 0);
  });

  it('compares pair vs. worse pair', () => {
    assert.equal(compareHands(
      ['Ac', 'Ad', '7h', '5s', '2c'],
      ['Js', 'Jh', '7d', '5c', '3s']
    ), 1);
  });

  it('compares two pair vs. better two pair', () => {
    assert.equal(compareHands(
      ['Tc', 'Td', '5h', '5s', 'Ac'],
      ['Js', 'Jh', '3d', '3c', '2s']
    ), -1);
  });

  it('compares two pair vs. same two pair', () => {
    assert.equal(compareHands(
      ['4c', '4d', '3h', '3s', 'Ac'],
      ['4s', '4h', '3d', '3c', 'As']
    ), 0);
  });

  it('compares two pair vs. two pair with worse kicker', () => {
    assert.equal(compareHands(
      ['Tc', 'Td', '5h', '5s', 'Ac'],
      ['Ts', 'Th', '5d', '5c', 'Ks']
    ), 1);
  });

  it('compares trips vs. better trips', () => {
    assert.equal(compareHands(
      ['Tc', 'Td', 'Th', 'As', 'Kc'],
      ['Js', 'Jh', 'Jd', '3c', '2s']
    ), -1);
  });

  it('compares trips vs. worse trips', () => {
    assert.equal(compareHands(
      ['3c', '3d', '3h', '4s', '5c'],
      ['2s', '2h', '2d', 'Qc', 'Js']
    ), 1);
  });

  it('compares straight vs. better straight', () => {
    assert.equal(compareHands(
      ['5c', '6d', '7h', '8s', '9c'],
      ['6s', '7h', '8d', '9c', 'Ts']
    ), -1);
  });

  it('compares straight vs. same straight', () => {
    assert.equal(compareHands(
      ['6c', '7d', '8h', '9s', 'Tc'],
      ['6c', '7d', '8h', '9h', 'Td']
    ), 0);
  });

  it('compares straight vs. worse straight', () => {
    assert.equal(compareHands(
      ['Ts', 'Jh', 'Qd', 'Kc', 'As'],
      ['9c', 'Td', 'Jh', 'Qs', 'Kc']
    ), 1);
  });

  it('compares flush vs. better flush', () => {
    assert.equal(compareHands(
      ['Ac', 'Tc', '7c', '5c', '2c'],
      ['Ac', 'Tc', '7c', '5c', '3c']
    ), -1);
  });

  it('compares flush vs. same flush', () => {
    assert.equal(compareHands(
      ['Ah', 'Th', '7h', '5h', '3h'],
      ['Ah', 'Th', '7h', '5h', '3h']
    ), 0);
  });

  it('compares flush vs. worse flush', () => {
    assert.equal(compareHands(
      ['As', 'Ts', '7s', '5s', '3s'],
      ['As', '9s', '7s', '5s', '3s']
    ), 1);
  });

  it('compares full house vs. better full house', () => {
    assert.equal(compareHands(
      ['Ac', 'Ad', 'Ah', '2s', '2c'],
      ['Ac', 'Ad', 'Ah', '7c', '7s']
    ), -1);
  });

  it('compares full house vs. same full house', () => {
    assert.equal(compareHands(
      ['Ac', 'Ad', 'Ah', '2s', '2c'],
      ['Ac', 'Ad', 'Ah', '2c', '2s']
    ), 0);
  });

  it('compares full house vs. worse full house', () => {
    assert.equal(compareHands(
      ['Ac', 'Ad', 'Ah', '2s', '2c'],
      ['Ks', 'Kh', 'Kd', 'Qc', 'Qs']
    ), 1);
  });

  it('compares quads vs. better quads', () => {
    assert.equal(compareHands(
      ['Kc', 'Kd', 'Kh', 'Ks', 'As'],
      ['Ac', 'Ad', 'Ah', 'As', 'Ks']
    ), -1);
  });

  it('compares quads vs. same quads', () => {
    assert.equal(compareHands(
      ['Kc', 'Kd', 'Kh', 'Ks', 'As'],
      ['Kc', 'Kd', 'Kh', 'Ks', 'As']
    ), 0);
  });

  it('compares quads vs. worse quads', () => {
    assert.equal(compareHands(
      ['Ac', 'Ad', 'Ah', 'As', 'Jc'],
      ['Ac', 'Ad', 'Ah', 'As', 'Ts']
    ), 1);
  });
});


describe('calcHand', () => {
  it('resolves high card', () => {
    const hand = ['Ac', '3d', '5h', '7s', '9c', 'Td', 'Qh'];
    assert.equal(calcHand(hand).strength, c.HAND_HIGH);
  });

  it('resolves pair', () => {
    const hand = ['Ac', 'Ad', '5h', '7s', '9c', 'Td', 'Qh'];
    assert.equal(calcHand(hand).strength, c.HAND_PAIR);
  });

  it('resolves two pair', () => {
    const hand = ['Ac', 'Ad', '5h', '5s', '9c', 'Td', 'Qh'];
    assert.equal(calcHand(hand).strength, c.HAND_TWO_PAIR);
  });

  it('resolves trips', () => {
    const hand = ['Ac', 'Ad', 'Ah', '5s', '9c', 'Td', 'Qh'];
    assert.equal(calcHand(hand).strength, c.HAND_TRIPS);
  });

  it('resolves straight', () => {
    const hand = ['2c', '3d', '4h', '5s', '6c', 'Td', 'Th'];
    assert.equal(calcHand(hand).strength, c.HAND_STRAIGHT);
  });

  it('resolves straight (wheel)', () => {
    const hand = ['Ac', '2d', '3h', '4s', '5c', 'Td', 'Th'];
    assert.equal(calcHand(hand).strength, c.HAND_STRAIGHT);
  });

  it('resolves straight (broadway)', () => {
    const hand = ['Tc', 'Jd', 'Qh', 'Ks', 'Ac', 'Td', 'Th'];
    assert.equal(calcHand(hand).strength, c.HAND_STRAIGHT);
  });

  it('resolves flush', () => {
    const hand = ['Ac', '3c', '5c', '7c', '9c', 'Td', 'Th'];
    assert.equal(calcHand(hand).strength, c.HAND_FLUSH);
  });

  it('resolves full house', () => {
    const hand = ['Ac', 'Ad', 'Ah', '5s', '5c', 'Td', 'Qh'];
    assert.equal(calcHand(hand).strength, c.HAND_BOAT);
  });

  it('resolves quads', () => {
    const hand = ['Ac', 'Ad', 'Ah', 'As', '5c', 'Td', 'Th'];
    assert.equal(calcHand(hand).strength, c.HAND_QUADS);
  });

  it('resolves straight flush', () => {
    const hand = ['2c', '3c', '4c', '5c', '6c', 'Td', 'Th'];
    assert.equal(calcHand(hand).strength, c.HAND_STR_FLUSH);
  });

  it('resolves straight flush (wheel)', () => {
    const hand = ['Ad', '2d', '3d', '4d', '5d', 'Th', 'Ts'];
    assert.equal(calcHand(hand).strength, c.HAND_STR_FLUSH);
  });

  it('resolves straight flush (broadway)', () => {
    // Broadway.
    const hand = ['Th', 'Jh', 'Qh', 'Kh', 'Ah', 'Ts', 'Tc'];
    assert.equal(calcHand(hand).strength, c.HAND_STR_FLUSH);
  });
});
