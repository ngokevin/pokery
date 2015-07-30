/*
  Deserializes ranges.

  TODO:
  - Store a list of all possible hands as a property on the class.
  - For multi-ranges, recurse and flatten.
*/
import _ from 'lodash';

import c from '../constants';


export default class Range {
  constructor(range) {
    // range (string) -- comma-separated hand ranges (e.g., "AKs, AJ+, JdJh").
    this.hands = [];  // Pre-populate the entire range.

    if (range.indexOf(',') !== -1) {
      // Split it and recurse.
      range.trim().split(',').forEach(innerRange => {
        this.hands = this.hands.concat(new Range(innerRange).hands);
      });
      return;
    } else {
      this.range = range.trim();
    }

    // Parse range.
    const cards = this.range;
    if (cards.constructor === String) {
      if (cards.length == 4) {
        this.initDefinedHand();
      } else if (cards.length === 3) {
        if (cards[2].toLowerCase() === 's') {
          this.initSuitedHand();
        } else if (cards[2].toLowerCase() === 'o') {
          this.initOffSuitedHand();
        } else if (cards[2] === '+') {
          if (cards[0] === cards[1]) {
            this.initPocketPairPlusHand();
          }
        }
      } else if (cards.length === 2) {
        if (cards[0] == cards[1]) {
          this.initPocketPairHand();
        } else {
          this.initRankOnlyHand();
        }
      }
    }
  }
  get(deadCards=[]) {
    // Return random hand from the range.
    function handOkay(hand) {
      return deadCards.indexOf(hand[0]) === -1 &&
             deadCards.indexOf(hand[1]) === -1;
    }

    for (let i = 0; i < 5; i++) {
      // Optimistically try random hands and return if no collisions.
      let hand = _.sample(this.hands);
      if (handOkay(hand)) {
        return hand;
      }
    }
    // We got a collision after 5 tries. Filter out all possible hands.
    let hands = _.filter(this.hands.slice(0), handOkay);

    if (!hands.length) {
      // In rare case, we have no possible hands, return -1.
      return -1;
    }
    return _.sample(hands);
  }
  initDefinedHand() {
    // Such as AhQd.
    const cards = this.range;
    this.hands.push([cards.slice(0, 2), cards.slice(2)]);
  }
  initSuitedHand() {
    // Such as AQs.
    const cards = this.range;
    c.SUITS.forEach(suit => {
      this.hands.push([`${cards[0]}${suit}`, `${cards[1]}${suit}`]);
    });
  }
  initOffSuitedHand() {
    // Such as AQo.
    const cards = this.range;
    c.SUITS.forEach(suit0 => {
      c.SUITS.forEach(suit1 => {
        if (suit0 != suit1) {
          this.hands.push([`${cards[0]}${suit0}`, `${cards[1]}${suit1}`]);
        }
      });
    });
  }
  initPocketPairHand() {
    // Such as AA.
    const cards = this.range;
    c.POCKET_SUIT_COMBOS.forEach(suits => {
      this.hands.push([`${cards[0]}${suits[0]}`, `${cards[1]}${suits[1]}`]);
    });
  }
  initPocketPairPlusHand() {
    // Such as AA.
    const cards = this.range;
    for (let i = c.RANK_INDEX[cards[0]]; i < c.RANKS.length; i++) {
      let card = c.RANKS[i];
      c.POCKET_SUIT_COMBOS.forEach(suits => {
        this.hands.push([`${card}${suits[0]}`, `${card}${suits[1]}`]);
      });
    }
  }
  initRankOnlyHand() {
    // Such as AK.
    this.initSuitedHand();
    this.initOffSuitedHand();
  }
  toString() {
    return this.range;
  }
}
