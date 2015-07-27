/*
  Monte-Carlo runs given hands and a board.
*/
import _ from 'lodash';

import c from '../constants';
import Deck from './Deck';
import Hand from './Hand';
import HoleCards from './HoleCards';


export default class Simulator {
  constructor(hands=[], board=[]) {
    // hands -- ['AhCd', QQ, 'AKs'].
    // board -- ['Ah', Jd', 2s'].
    this.hands = hands.map(hand => new HoleCards(hand));
    this.board = board;

    // TODO: need to somehow exclude cards from the deck, but allow for ranges.
    this.runs = 0;
    this.ties = 0;
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
      let winningHand = maxHand(madeHands);

      this.runs++;

      if (winningHand !== -1) {
        this.results[winningHand].wins++;
      } else {
        this.ties++;
      }
    }
  }
  getResults() {
    // Aggregate results.
    return this.results.map(result => {
      const runs = this.runs;
      const wins = result.wins;
      const ties = this.ties;
      const losses = runs - result.wins - ties;

      return _.extend(result, {
        losses: losses,
        ties: ties,

        lossPct: (losses / runs) * 100,
        tiePct: (ties / runs) * 100,
        winPct: (wins / runs) * 100,

        // equity = win% + (tie% / #hands).
        ev: (wins / runs) + (ties / runs / this.results.length),
      });
    });
  }
}


export function maxHand(hands) {
  /*
    Returns the index of the best hand, -1 if all a tie.
    hands -- List of hands (e.g., [[Ac,Ad,Ah,As,Kc,Kd,Kh]]).
  */
  // Find the winning hand by looping over and comparing to the previous.
  let winningHand;

  hands.forEach((hand, i) => {
    if (i === 0) {
      // Nothing to compare.
      return;
    }

    let handMatchup = winningHand === undefined ? i - 1 : winningHand;
    let result = hand.vs(hands[handMatchup]);

    if (result === -1 && winningHand === undefined) {
      // If the first hand won, set it as the winning hand.
      winningHand = i - 1;
    } else if (result === 1) {
      // New winning hand.
      winningHand = i;
    }
  });

  return winningHand !== undefined ? winningHand : -1;
}
