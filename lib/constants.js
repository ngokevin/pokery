// Card enumeration constants.
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _HAND_STRS, _ROUND_STRS;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var RANKS = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];
var SUITS = ['c', 'd', 'h', 's'];

// Maps a rank string to an absolute number.
var RANK_STRENGTHS = {};
RANKS.forEach(function (rank, i) {
  RANK_STRENGTHS[rank] = i + 2;
});

// Maps a rank string to its index in the RANKS array.
var RANK_INDEX = {};
RANKS.forEach(function (rank, i) {
  RANK_INDEX[rank] = i;
});

// Maps a suit string to its index in the SUITS array.
var SUIT_INDEX = {};
SUITS.forEach(function (suit, i) {
  SUIT_INDEX[suit] = i;
});

// Hand strength constants.
var HAND_HIGH = 0;
var HAND_PAIR = 1;
var HAND_TWO_PAIR = 2;
var HAND_TRIPS = 3;
var HAND_STRAIGHT = 4;
var HAND_FLUSH = 5;
var HAND_BOAT = 6;
var HAND_QUADS = 7;
var HAND_STR_FLUSH = 8;

var HAND_STRS = (_HAND_STRS = {}, _defineProperty(_HAND_STRS, HAND_HIGH, 'High Card'), _defineProperty(_HAND_STRS, HAND_PAIR, 'Pair'), _defineProperty(_HAND_STRS, HAND_TWO_PAIR, 'Two Pair'), _defineProperty(_HAND_STRS, HAND_TRIPS, 'Three-of-a-kind'), _defineProperty(_HAND_STRS, HAND_STRAIGHT, 'Straight'), _defineProperty(_HAND_STRS, HAND_FLUSH, 'Flush'), _defineProperty(_HAND_STRS, HAND_BOAT, 'Full House'), _defineProperty(_HAND_STRS, HAND_QUADS, 'Four-of-a-kind'), _defineProperty(_HAND_STRS, HAND_STR_FLUSH, 'Straight Flush'), _HAND_STRS);

// Round constants.
var ROUND_PREFLOP = 0;
var ROUND_FLOP = 1;
var ROUND_TURN = 2;
var ROUND_RIVER = 3;
var ROUND_LIST = [ROUND_PREFLOP, ROUND_FLOP, ROUND_TURN, ROUND_RIVER];

var ROUND_STRS = (_ROUND_STRS = {}, _defineProperty(_ROUND_STRS, ROUND_PREFLOP, 'Preflop'), _defineProperty(_ROUND_STRS, ROUND_FLOP, 'Flop'), _defineProperty(_ROUND_STRS, ROUND_TURN, 'Turn'), _defineProperty(_ROUND_STRS, ROUND_RIVER, 'River'), _ROUND_STRS);

exports['default'] = {
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
  ROUND_STRS: ROUND_STRS
};
module.exports = exports['default'];