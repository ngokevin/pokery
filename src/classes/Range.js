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

    if (range.constructor === Array) {
      range = range.join(',');
    }

    if (range.indexOf(',') !== -1) {
      // Split it and recurse.
      range.trim().split(',').forEach(innerRange => {
        this.hands = this.hands.concat(new Range(innerRange).hands);
      });
      return;
    } else {
      // In the base case, get it ready to parse.
      this.range = range.trim();
    }

    // Parse range.
    const cards = this.range;
    if (cards.constructor === String) {
      if (cards.length == 5) {
        if (cards[2] === '-') {
          if (cards[0] === cards[1] && cards[3] === cards[4]) {
            this.initPocketPairRangeHand();
          }
        }
      }

      if (cards.length == 4) {
        if (cards.indexOf('+') === 2 || cards.indexOf('+') === 3) {
          if (cards.indexOf('s') !== -1) {
            this.initSuitedPlusHand();
          } else if (cards.indexOf('o') !== -1) {
            this.initOffSuitedPlusHand();
          }
        } else {
          this.initDefinedHand();
        }
      }

      if (cards.length === 3) {
        if (cards[2].toLowerCase() === 's') {
          this.initSuitedHand();
        } else if (cards[2].toLowerCase() === 'o') {
          this.initOffSuitedHand();
        } else if (cards[2] === '+') {
          if (cards[0] === cards[1]) {
            this.initPocketPairPlusHand();
          } else {
            this.initRankOnlyPlusHand();
          }
        }
      }

      if (cards.length === 2) {
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
  initRankOnlyHand() {
    // Such as AK.
    this.initOffSuitedHand();
    this.initSuitedHand();
  }
  initRankOnlyPlusHand() {
    // Such as AT+.
    // Expand to AT, AJ, AQ, AK.
    let cards = this.range;
    if (c.RANK_STRENGTHS[cards[1]] > c.RANK_STRENGTHS[cards[0]]) {
      cards = `${cards[1]}${cards[0]}`;
    }
    let secondCardRankRange = c.RANKS.slice(c.RANK_INDEX[cards[1]],
                                            c.RANK_INDEX[cards[0]]);
    let hands = secondCardRankRange.map(card => `${cards[0]}${card}`);
    this.hands = this.hands.concat(new Range(hands).hands);
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
  initOffSuitedPlusHand() {
    // Such as ATo+ or AT+o.
    // Expand to ATo, AJo, AQo, AKo.
    let cards = this.range;
    if (c.RANK_STRENGTHS[cards[1]] > c.RANK_STRENGTHS[cards[0]]) {
      cards = `${cards[1]}${cards[0]}`;
    }
    let secondCardRankRange = c.RANKS.slice(c.RANK_INDEX[cards[1]],
                                            c.RANK_INDEX[cards[0]]);
    let hands = secondCardRankRange.map(card => `${cards[0]}${card}o`);
    this.hands = this.hands.concat(new Range(hands).hands);
  }
  initSuitedHand() {
    // Such as AQs.
    const cards = this.range;
    c.SUITS.forEach(suit => {
      this.hands.push([`${cards[0]}${suit}`, `${cards[1]}${suit}`]);
    });
  }
  initSuitedPlusHand() {
    // Such as ATo+ or AT+o.
    // Expand to ATo, AJo, AQo, AKo.
    let cards = this.range;
    if (c.RANK_STRENGTHS[cards[1]] > c.RANK_STRENGTHS[cards[0]]) {
      cards = `${cards[1]}${cards[0]}`;
    }
    let secondCardRankRange = c.RANKS.slice(c.RANK_INDEX[cards[1]],
                                            c.RANK_INDEX[cards[0]]);
    let hands = secondCardRankRange.map(card => `${cards[0]}${card}s`);
    this.hands = this.hands.concat(new Range(hands).hands);
  }
  initPocketPairHand() {
    // Such as AA.
    const cards = this.range;
    c.POCKET_SUIT_COMBOS.forEach(suits => {
      this.hands.push([`${cards[0]}${suits[0]}`, `${cards[1]}${suits[1]}`]);
    });
  }
  initPocketPairRangeHand() {
    // Such as 55-88.
    let cards = this.range;
    if (c.RANK_STRENGTHS[cards[0]] > c.RANK_STRENGTHS[cards[4]]) {
      // Swap to expect low-to-high iteration.
      cards = `${cards[4]}${cards[4]}-${cards[0]}${cards[0]}`
    }
    for (let i = c.RANK_INDEX[cards[0]]; i <= c.RANK_INDEX[cards[4]]; i++) {
      let card = c.RANKS[i];
      c.POCKET_SUIT_COMBOS.forEach(suits => {
        this.hands.push([`${card}${suits[0]}`, `${card}${suits[1]}`]);
      });
    }
  }
  initPocketPairPlusHand() {
    // Such as QQ+.
    const cards = this.range;
    for (let i = c.RANK_INDEX[cards[0]]; i < c.RANKS.length; i++) {
      let card = c.RANKS[i];
      c.POCKET_SUIT_COMBOS.forEach(suits => {
        this.hands.push([`${card}${suits[0]}`, `${card}${suits[1]}`]);
      });
    }
  }
  toString() {
    return this.range;
  }
}
