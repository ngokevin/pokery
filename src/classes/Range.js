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
    if (this.range.constructor === String) {
      if (this.range.length == 4) {
        this.initDefinedHand();
      } else if (this.range.length === 3) {
        if (this.range[2].toLowerCase() === 's') {
          this.initSuitedHand();
        } else if (this.range[2].toLowerCase() === 'o') {
          this.initOffSuitedHand();
        }
      } else if (this.range.length === 2) {
        if (this.range[0] == range[1]) {
          this.initPocketPairHand();
        } else {
          this.initRankOnlyHand();
        }
      }
    }
  }
  get() {
    // Return random hand from the range.
    return _.sample(this.hands);
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
  initRankOnlyHand() {
    // Such as AK.
    this.initSuitedHand();
    this.initOffSuitedHand();
  }
  toString() {
    return this.range;
  }
}
