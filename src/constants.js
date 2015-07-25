// Card enumeration constants.
const RANKS = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];
const SUITS = ['c', 'd', 'h', 's'];

// Maps a rank string to an absolute number.
const RANK_STRENGTHS = {};
RANKS.forEach((rank, i) => {
  RANK_STRENGTHS[rank] = i + 2;
});

// Maps a rank string to its index in the RANKS array.
let RANK_INDEX = {};
RANKS.forEach((rank, i) => {
  RANK_INDEX[rank] = i;
});

// Maps a suit string to its index in the SUITS array.
let SUIT_INDEX = {};
SUITS.forEach((suit, i) => {
  SUIT_INDEX[suit] = i;
});


// Hand strength constants.
const HAND_HIGH = 0;
const HAND_PAIR = 1;
const HAND_TWO_PAIR = 2;
const HAND_TRIPS = 3;
const HAND_STRAIGHT = 4;
const HAND_FLUSH = 5;
const HAND_BOAT = 6;
const HAND_QUADS = 7;
const HAND_STR_FLUSH = 8;

const HAND_STRS = {
  [HAND_HIGH]: 'High Card',
  [HAND_PAIR]: 'Pair',
  [HAND_TWO_PAIR]: 'Two Pair',
  [HAND_TRIPS]: 'Three-of-a-kind',
  [HAND_STRAIGHT]: 'Straight',
  [HAND_FLUSH]: 'Flush',
  [HAND_BOAT]: 'Full House',
  [HAND_QUADS]: 'Four-of-a-kind',
  [HAND_STR_FLUSH]: 'Straight Flush',
};


// Round constants.
const ROUND_PREFLOP = 0;
const ROUND_FLOP = 1;
const ROUND_TURN = 2;
const ROUND_RIVER = 3;
const ROUND_LIST = [
  ROUND_PREFLOP,
  ROUND_FLOP,
  ROUND_TURN,
  ROUND_RIVER
];

const ROUND_STRS = {
  [ROUND_PREFLOP]: 'Preflop',
  [ROUND_FLOP]: 'Flop',
  [ROUND_TURN]: 'Turn',
  [ROUND_RIVER]: 'River',
};


export default {
  RANKS: RANKS,
  SUITS: SUITS,
  RANK_STRENGTHS: RANK_STRENGTHS,
  RANK_INDEX: RANK_INDEX,
  SUIT_INDEX: SUIT_INDEX,

  HAND_HIGH: HAND_HIGH,
  HAND_PAIR: HAND_PAIR,
  HAND_TWO_PAIR: HAND_TWO_PAIR,
  HAND_TRIPS: HAND_TRIPS,
  HAND_STRAIGHT: HAND_STRAIGHT,
  HAND_FLUSH: HAND_FLUSH,
  HAND_BOAT: HAND_BOAT,
  HAND_QUADS: HAND_QUADS,
  HAND_STR_FLUSH: HAND_STR_FLUSH,
  HAND_STRS: HAND_STRS,

  ROUND_PREFLOP: ROUND_PREFLOP,
  ROUND_FLOP: ROUND_FLOP,
  ROUND_TURN: ROUND_TURN,
  ROUND_RIVER: ROUND_RIVER,
  ROUND_LIST: ROUND_LIST,
  ROUND_STRS: ROUND_STRS,
};
