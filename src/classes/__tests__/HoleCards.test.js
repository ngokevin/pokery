import HoleCards from '../HoleCards';


describe('HoleCards', () => {
  it('generates defined hand', () => {
    const cards = new HoleCards('Ah2d');
    const range = [['Ah', '2d']];
    assertDeepInclude(range, cards.get());
  });

  it('generates suited hand', () => {
    const cards = new HoleCards('AQs');
    const range = c.SUITS.map(suit => [`A${suit}`, `Q${suit}`]);
    for (let i = 0; i < 6; i++) {
      assertDeepInclude(range, cards.get());
    }
  });

  it('generates rank-only hand', () => {
    const cards = new HoleCards('AQ');
    let range = [];
    c.SUITS.forEach(suitA => {
      c.SUITS.forEach(suitB => {
        range.push([`A${suitA}`, `Q${suitB}`]);
      });
    });
    for (let i = 0; i < 24; i++) {
      assertDeepInclude(range, cards.get());
    }
  });

  it('toString', () => {
    assert.equal(new HoleCards('5h2d'), '5h2d');
    assert.equal(new HoleCards('AQs'), 'AQs');
    assert.equal(new HoleCards('AQ'), 'AQ');
  });
});
