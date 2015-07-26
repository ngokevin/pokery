/*
  Monte-Carlo runs given hands and a board.
*/
import _ from 'lodash';

import Deck from './Deck';
import Hand from './Hand';
import HoleCards from './HoleCards';


export default class Simulator {
  constructor(hands, board) {
    // hands -- ['AhCd', QQ, 'AKs'].
    // board -- ['Ah', Jd', 2s'].

    this.hands = hands.map(hand => new HoleCards(hand));
    this.board = board;

    // TODO: need to somehow exclude cards from the deck, but allow for ranges.
    // Might need to generate a new deck on each run, and randomly choose a
    // card.
    this.results = hands.map(hand => ({
      hand: hand,
      wins: 0
    }));
  }
  run(n) {
    for (let i = 0; i < n; i++) {
      // Generate HoleCards from the ranges, build a Deck excluding those.
      // Draw from the deck onto the board.
      let hands = this.hands.map(holeCards => holeCards.get());
      let deck = new Deck(_.flatten(hands));
      let board = this.board.concat(
        deck.draw(c.BOARD_LENGTH - this.board.length));

      // Build the full 7-card hands.
      let madeHands = hands.map(hand => new Hand(hand.concat(board)));

      // Find the winning hand by looping over and comparing to the previous.
      let winningHand;
      madeHands.forEach((hand, i) => {
        if (i === 0) {
          // Nothing to compare.
          return;
        }
        const result = hand.vs(madeHands[i - 1]);
        if (result === -1 && !winningHand) {
          // If the first hand won, set it as the winning hand.
          winningHand = i - 1;
        } else if (result === 1) {
          // New winning hand.
          winningHand = i;
        }
      });

      this.results[winningHand].wins++;
    }
  }
  getResults() {
    // Aggregate results.
  }
}
