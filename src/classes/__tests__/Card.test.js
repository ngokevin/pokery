import Card from '../Card';


describe('Card', () => {
  it('creates a card', () => {
    const card = new Card('2d');
    assert.equal(card.rank, 2);
    assert.equal(card.suit, 'd');
  });

  it('creates a card (broadway)', () => {
    const card = new Card('Ah');
    assert.equal(card.rank, 14);
    assert.equal(card.suit, 'h');
  });

  it('can convert back to string', () => {
    const card = new Card('Ah');
    assert.equal(card.toString(), 'Ah');
  });
});
