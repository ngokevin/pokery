import Deck from './classes/Deck';


export default class Simulate {
  constructor(hands, board) {
    // hands -- ['AhCd', QQ, 'AKs'].
    // board -- ['Ah', Jd', 2s'].

    // TODO: for unspecified suits, need to assign a suit randomly.
    this.hands = hands;
    this.board = board;

    // TODO: need to somehow exclude cards from the deck, but allow for ranges.
    // Might need to generate a new deck on each run, and randomly choose a
    // card.
    this.results = [];
  }
  run(n) {
    hands.forEach

    const deck = Deck(hands);
  }
}
