/*
  Deserializes a card ('Ah') to an object.

  Ah => {card: 'Ah', rank: 14, rankStr: 'A', suit: 'h'}
*/
import c from '../constants';


export default class Card {
  constructor(card) {
    this.card = card;
    this.rankStr = card[0];
    this.rank = c.RANK_STRENGTHS[card[0]];
    this.suit = card[1];
  }
  toString() {
    return this.card;
  }
}
