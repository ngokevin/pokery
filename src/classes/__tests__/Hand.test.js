import Hand from '../Hand';


describe('Hand.constructor', () => {
  it('reduces to high card', () => {
    const hand = new Hand(['Ac', '3d', '5h', '7s', '9c', 'Td', 'Qh']);
    assert.equal(hand.strength, c.HAND_HIGH);
  });

  it('reduces to pair', () => {
    const hand = new Hand(['Ac', 'Ad', '5h', '7s', '9c', 'Td', 'Qh']);
    assert.equal(hand.strength, c.HAND_PAIR);
  });

  it('reduces to two pair', () => {
    const hand = new Hand(['Ac', 'Ad', '5h', '5s', '9c', 'Td', 'Qh']);
    assert.equal(hand.strength, c.HAND_TWO_PAIR);
  });

  it('reduces to trips', () => {
    const hand = new Hand(['Ac', 'Ad', 'Ah', '5s', '9c', 'Td', 'Qh']);
    assert.equal(hand.strength, c.HAND_TRIPS);
  });

  it('reduces to trips (not straight)', () => {
    const hand = new Hand(['Ks', 'Kc', '4d', '2c', '3h', 'Kd', '8d']);
    assert.equal(hand.strength, c.HAND_TRIPS);
  });

  it('reduces to straight', () => {
    const hand = new Hand(['2c', '3d', '4h', '5s', '6c', 'Td', 'Th']);
    assert.equal(hand.strength, c.HAND_STRAIGHT);
  });

  it('reduces to straight (wheel)', () => {
    const hand = new Hand(['Ac', '2d', '3h', '4s', '5c', 'Td', 'Th']);
    assert.equal(hand.strength, c.HAND_STRAIGHT);
  });

  it('reduces to straight (broadway)', () => {
    const hand = new Hand(['Tc', 'Jd', 'Qh', 'Ks', 'Ac', 'Td', 'Th']);
    assert.equal(hand.strength, c.HAND_STRAIGHT);
  });

  it('reduces to flush', () => {
    const hand = new Hand(['Ac', '3c', '5c', '7c', '9c', 'Td', 'Th']);
    assert.equal(hand.strength, c.HAND_FLUSH);
  });

  it('reduces to full house', () => {
    const hand = new Hand(['Ac', 'Ad', 'Ah', '5s', '5c', 'Td', 'Qh']);
    assert.equal(hand.strength, c.HAND_BOAT);
  });

  it('reduces to quads', () => {
    const hand = new Hand(['Ac', 'Ad', 'Ah', 'As', '5c', 'Td', 'Th']);
    assert.equal(hand.strength, c.HAND_QUADS);
  });

  it('reduces to straight flush', () => {
    const hand = new Hand(['2c', '3c', '4c', '5c', '6c', 'Td', 'Th']);
    assert.equal(hand.strength, c.HAND_STR_FLUSH);
  });

  it('reduces to straight flush (wheel)', () => {
    const hand = new Hand(['Ad', '2d', '3d', '4d', '5d', 'Th', 'Ts']);
    assert.equal(hand.strength, c.HAND_STR_FLUSH);
  });

  it('reduces to straight flush (broadway)', () => {
    // Broadway.
    const hand = new Hand(['Th', 'Jh', 'Qh', 'Kh', 'Ah', 'Ts', 'Tc']);
    assert.equal(hand.strength, c.HAND_STR_FLUSH);
  });
});


describe('Hand.vs', () => {
  it('compares high card vs. better high card', () => {
    assert.equal(new Hand(['Ac', 'Td', '7h', '5s', '2c']).vs(
                 new Hand(['As', 'Th', '7d', '5c', '3s'])), -1);
  });

  it('compares high card vs. same high card', () => {
    assert.equal(new Hand(['Ac', 'Td', '7h', '5s', '3c']).vs(
                 new Hand(['As', 'Th', '7d', '5c', '3s'])), 0);
  });

  it('compares high card vs. worse high card', () => {
    assert.equal(new Hand(['Ac', 'Td', '7h', '5s', '3c']).vs(
                 new Hand(['As', '9h', '7d', '5c', '3s'])), 1);
  });

  it('compares high card vs. pair', () => {
    assert.equal(new Hand(['Ac', 'Td', '7h', '5s', '3c']).vs(
                 new Hand(['As', 'Ah', '7d', '5c', '3s'])), -1);
  });

  it('compares pair vs. pair with better kickers', () => {
    assert.equal(new Hand(['Ac', 'Ad', '7h', '5s', '2c']).vs(
                 new Hand(['As', 'Ah', '7d', '5c', '3s'])), -1);
  });

  it('compares pair vs. same pair', () => {
    assert.equal(new Hand(['Kc', 'Kd', '7h', '5s', '2c']).vs(
                 new Hand(['Ks', 'Kh', '7d', '5c', '2s'])), 0);
  });

  it('compares pair vs. worse pair', () => {
    assert.equal(new Hand(['Ac', 'Ad', '7h', '5s', '2c']).vs(
                 new Hand(['Js', 'Jh', '7d', '5c', '3s'])), 1);
  });

  it('compares two pair vs. better two pair', () => {
    assert.equal(new Hand(['Tc', 'Td', '5h', '5s', 'Ac']).vs(
                 new Hand(['Js', 'Jh', '3d', '3c', '2s'])), -1);
  });

  it('compares two pair vs. same two pair', () => {
    assert.equal(new Hand(['4c', '4d', '3h', '3s', 'Ac']).vs(
                 new Hand(['4s', '4h', '3d', '3c', 'As'])), 0);
  });

  it('compares two pair vs. two pair with worse kicker', () => {
    assert.equal(new Hand(['Tc', 'Td', '5h', '5s', 'Ac']).vs(
                 new Hand(['Ts', 'Th', '5d', '5c', 'Ks'])), 1);
  });

  it('compares trips vs. better trips', () => {
    assert.equal(new Hand(['Tc', 'Td', 'Th', 'As', 'Kc']).vs(
                 new Hand(['Js', 'Jh', 'Jd', '3c', '2s'])), -1);
  });

  it('compares trips vs. worse trips', () => {
    assert.equal(new Hand(['3c', '3d', '3h', '4s', '5c']).vs(
                 new Hand(['2s', '2h', '2d', 'Qc', 'Js'])), 1);
  });

  it('compares straight vs. better straight', () => {
    assert.equal(new Hand(['5c', '6d', '7h', '8s', '9c']).vs(
                 new Hand(['6s', '7h', '8d', '9c', 'Ts'])), -1);
  });

  it('compares straight vs. same straight', () => {
    assert.equal(new Hand(['6c', '7d', '8h', '9s', 'Tc']).vs(
                 new Hand(['6c', '7d', '8h', '9h', 'Td'])), 0);
  });

  it('compares straight vs. worse straight', () => {
    assert.equal(new Hand(['Ts', 'Jh', 'Qd', 'Kc', 'As']).vs(
                 new Hand(['9c', 'Td', 'Jh', 'Qs', 'Kc'])), 1);
  });

  it('compares flush vs. better flush', () => {
    assert.equal(new Hand(['Ac', 'Tc', '7c', '5c', '2c']).vs(
                 new Hand(['Ac', 'Tc', '7c', '5c', '3c'])), -1);
  });

  it('compares flush vs. same flush', () => {
    assert.equal(new Hand(['Ah', 'Th', '7h', '5h', '3h']).vs(
                 new Hand(['Ah', 'Th', '7h', '5h', '3h'])), 0);
  });

  it('compares flush vs. worse flush', () => {
    assert.equal(new Hand(['As', 'Ts', '7s', '5s', '3s']).vs(
                 new Hand(['As', '9s', '7s', '5s', '3s'])), 1);
  });

  it('compares full house vs. better full house', () => {
    assert.equal(new Hand(['Ac', 'Ad', 'Ah', '2s', '2c']).vs(
                 new Hand(['Ac', 'Ad', 'Ah', '7c', '7s'])), -1);
  });

  it('compares full house vs. same full house', () => {
    assert.equal(new Hand(['Ac', 'Ad', 'Ah', '2s', '2c']).vs(
                 new Hand(['Ac', 'Ad', 'Ah', '2c', '2s'])), 0);
  });

  it('compares full house vs. worse full house', () => {
    assert.equal(new Hand(['Ac', 'Ad', 'Ah', '2s', '2c']).vs(
                 new Hand(['Ks', 'Kh', 'Kd', 'Qc', 'Qs'])), 1);
  });

  it('compares quads vs. better quads', () => {
    assert.equal(new Hand(['Kc', 'Kd', 'Kh', 'Ks', 'As']).vs(
                 new Hand(['Ac', 'Ad', 'Ah', 'As', 'Ks'])), -1);
  });

  it('compares quads vs. same quads', () => {
    assert.equal(new Hand(['Kc', 'Kd', 'Kh', 'Ks', 'As']).vs(
                 new Hand(['Kc', 'Kd', 'Kh', 'Ks', 'As'])), 0);
  });

  it('compares quads vs. worse quads', () => {
    assert.equal(new Hand(['Ac', 'Ad', 'Ah', 'As', 'Jc']).vs(
                 new Hand(['Ac', 'Ad', 'Ah', 'As', 'Ts'])), 1);
  });
});
