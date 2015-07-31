/*
  Monte-Carlo runs given hands and a board.
*/
import _ from 'lodash';

import c from '../constants';
import Deck from './Deck';
import Hand from './Hand';
import Range from './Range';


export default class Simulator {
  constructor(ranges=[], board=[]) {
    // ranges -- ['AhCd', QQ, 'AKs'].
    // board -- ['Ah', Jd', 2s'].
    this.ranges = ranges.map(hand => new Range(hand));
    this.board = board;

    this.failedRuns = 0;
    this.runs = 0;
    this.ties = 0;
    this.results = ranges.map(range => ({
      range: range,
      wins: 0
    }));
    this.getResults();
  }
  run(n=1000) {
    if (this.board.length) {
      console.log(
        `Running ${this.ranges.join(' vs. ')} on ${this.board} board` +
        `, ${n} times`);
    } else {
      console.log(
        `Running ${this.ranges.join(' vs. ')}, ${n} times`);
    }

    for (let i = 0; i < n; i++) {
      // Generate hole cards from the ranges, build a Deck excluding those.
      // Draw from the deck onto the board.
      let deadCards = this.board;
      let hands = this.ranges.map(range => {
        let hand = range.get(deadCards);
        deadCards = deadCards.concat(hand);
        return hand;
      });

      if (hands.indexOf(-1) !== -1) {
        // Unresolvable collision.
        this.failedRuns++;
        continue;
      }

      let deck = new Deck(_.flatten(hands));
      let board = this.board.concat(
        deck.draw(c.BOARD_LENGTH - this.board.length));

      // Build the full 7-card hands.
      let madeHands = hands.map(hand => new Hand(hand.concat(board)));
      let winningHand = maxHand(madeHands);

      this.runs++;

      if (winningHand === -1) {
        this.ties++;
      } else {
        this.results[winningHand].wins++;
      }
    }

    if (this.failedRuns) {
      console.log(`${this.failedRuns} failed runs due to hole card ` +
                  'collisions.');
    }
    return this.getResults();
  }
  getResults() {
    // Aggregate results.
    this.results = this.results.map(result => {
      const runs = this.runs;
      const wins = result.wins;
      const ties = this.ties;
      const losses = runs - result.wins - ties;

      // equity = win% + (tie% / #hands).
      const ev = (wins / runs) + (ties / runs / this.results.length);

      if (!this.runs) {
        return result;
      }

      return _.extend(result, {
        losses: losses,
        ties: ties,

        lossPct: (losses / runs) * 100,
        tiePct: (ties / runs) * 100,
        winPct: (wins / runs) * 100,

        ev: ev,
        odds: (1 / (1 - ev)) - 1,
      });
    });

    return this.results;
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
