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
