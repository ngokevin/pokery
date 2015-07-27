/*
  Deserializes several hole cards formats.
*/
import c from '../constants';
import {randSuit} from '../utils';


export default class HoleCards {
  constructor(cards) {
    this.cards = cards;

    // Parse cards.
    if (cards.constructor === String) {
      if (cards.length == 4) {
        this.initDefinedHand();
      } else if (cards.length === 3 && cards[2].toLowerCase() === 's') {
        this.initSuitedHand();
      } else if (cards.length === 2) {
        this.initRankOnlyHand();
      }
    }
  }
  initDefinedHand() {
    // Such as AhQd. Split the cards.
    const cards = this.cards;
    this.get = () => [cards.slice(0, 2), cards.slice(2)];
  }
  initSuitedHand() {
    // Such as AQs. Assign one random suit to both cards.
    const cards = this.cards;
    this.get = () => {
      const suit = randSuit();
      return [`${cards[0]}${suit}`, `${cards[1]}${suit}`];
    };
  }
  initRankOnlyHand() {
    // Such as AA. Assign one random suit to each card w/o collisions.
    const cards = this.cards;
    this.get = () => {
      const suit1 = randSuit();
      let suit2 = randSuit();
      while (cards[0] == cards[1] && suit1 == suit2) {
        // Watch for collisions (cardA == cardB).
        suit2 = randSuit();
      }
      return [`${cards[0]}${suit1}`, `${cards[1]}${suit2}`];
    };
  }
  toString() {
    return this.cards;
  }
}
