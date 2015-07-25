import c from '../constants';


// Create an initial deck once.
const DECK = [];
c.RANKS.forEach(rank => {
  c.SUITS.forEach(suit => {
    DECK.push(rank + suit);
  });
});


export default class Deck {
  constructor(alreadyDrawnCards = []) {
    // excludedCards -- ['Ah', '2c'].
    let cards = DECK.slice(0);

    alreadyDrawnCards.forEach(card => {
      // Clever way to find exactly where a card is within a deck.
      cards[c.RANK_INDEX[card[0]] * 4 + c.SUIT_INDEX[card[1]]] = null;
    });

    this.cards = cards.filter(card => !!card);
  }
  draw(n) {
    // Return n unique cards from the deck. Won't actually pop from the deck.
    n = n > this.cards.length ? this.cards.length : n;

    let drawnCards = [];
    for (let i = 0; i < n; i++) {
      let randomIndex;
      do {
        randomIndex = Math.floor(Math.random() * this.cards.length);
      } while (drawnCards.indexOf(randomIndex) !== -1)

      drawnCards.push(randomIndex);
    }

    return drawnCards.map(cardIndex => this.cards[cardIndex]);
  }
}
