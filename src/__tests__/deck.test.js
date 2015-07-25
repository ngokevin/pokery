import Deck from '../classes/Deck';


describe('Deck', () => {
  it('has 52 cards', () => {
    const deck = new Deck();
    assert.equal(_.uniq(deck.cards).length, 52);
  });

  it('can draw 0 cards', () => {
    const deck = new Deck();
    const cards = deck.draw(0);
    assert.equal(cards.length, 0);
  });

  it('can draw 1 card', () => {
    const deck = new Deck();
    const cards = deck.draw(1);
    assert.equal(cards.length, 1);
    cards.forEach(card => {
      assert.equal(card.constructor, String);
      assert.equal(card.length, 2);
    });
  });

  it('can draw 2 cards', () => {
    const deck = new Deck();
    const cards = deck.draw(2);
    assert.equal(cards.length, 2);
    cards.forEach(card => {
      assert.equal(card.constructor, String);
      assert.equal(card.length, 2);
    });
  });

  it('can draws unique cards', () => {
    const deck = new Deck();
    const cards = deck.draw(51);
    assert.equal(_.uniq(cards).length, 51);
  });

  it('can exclude cards from deck constructor', () => {
    const alreadyDrawnCards = ['Ad', 'Ah', 'Kd', 'Ks'];
    const deck = new Deck(alreadyDrawnCards);

    assert.equal(deck.cards.length, 48);

    alreadyDrawnCards.forEach(card => {
      assert.equal(deck.cards.indexOf(card), -1);
    });
  });
});
