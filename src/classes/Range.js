/*
  Deserializes ranges.

  TODO:
  - Store a list of all possible hands as a property on the class.
  - For multi-ranges, recurse and flatten.
*/
import _ from 'lodash';

import c from '../constants';


export default class Range {
  constructor(cards) {
    this.cards = cards;

    // Parse cards.
    if (cards.constructor === String) {
      if (cards.length == 4) {
        this.initDefinedHand();
      } else if (cards.length === 3) {
        if (cards[2].toLowerCase() === 's') {
          this.initSuitedHand();
        } else if (cards[2].toLowerCase() === 'o') {
          this.initOffSuitedHand();
        }
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
  initOffSuitedHand() {
    // Such as AQo. Assign unique suits to both cards.
    const cards = this.cards;
    this.get = () => {
      const suit0 = randSuit();
      let suit1;
      do {
        suit1 = randSuit();
      } while (suit0 == suit1)
      return [`${cards[0]}${suit0}`, `${cards[1]}${suit1}`];
    };
  }
  initRankOnlyHand() {
    // Such as AA. Assign one random suit to each card w/o collisions.
    const cards = this.cards;
    this.get = () => {
      const suit0 = randSuit();
      let suit1;
      do {
        // Watch for card collisions.
        suit1 = randSuit();
      } while (cards[0] == cards[1] && suit0 == suit1)
      return [`${cards[0]}${suit0}`, `${cards[1]}${suit1}`];
    };
  }
  toString() {
    return this.cards;
  }
}


function randSuit() {
  return _.sample(c.SUITS);
}
