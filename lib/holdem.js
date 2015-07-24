'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

exports.calcHand = calcHand;
exports.compareHands = compareHands;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _constants = require('./constants');

// Create an initial deck once.

var _constants2 = _interopRequireDefault(_constants);

var DECK = [];
_constants2['default'].RANKS.forEach(function (rank) {
  _constants2['default'].SUITS.forEach(function (suit) {
    DECK.push(rank + suit);
  });
});

var Deck = (function () {
  function Deck(excludedCards) {
    _classCallCheck(this, Deck);

    // excludedCards -- ['Ah', '2c'].
    var cards = DECK.slice(0);

    excludedCards.forEach(function (card) {
      // Clever way to find exactly where a card is within a deck.
      cards[_constants2['default'].RANK_INDEX[card[0]] + _constants2['default'].SUIT_INDEX[card[1]]] = null;
    });

    this.cards = cards.filter(function (card) {
      return !!card;
    });
  }

  _createClass(Deck, [{
    key: 'draw',
    value: function draw(n) {
      var _this = this;

      // Return n unique cards from the deck. Won't actually pop from the deck.
      var drawnCards = [];
      for (var i = 0; i < n; n++) {
        do {
          var _randomIndex = Math.floor(Math.random() * this.cards.length);
        } while (drawnCards.indexOf(randomIndex) !== -1);
        drawnCards.push(randomIndex);
      }
      return drawnCards.map(function (cardIndex) {
        return _this.cards[cardIndex];
      });
    }
  }]);

  return Deck;
})();

exports.Deck = Deck;

function calcHand(hand) {
  // Iterates through hand, recursively removing a card until we get
  // five-card hands. Determines the strength of hand, returns it, and
  // the best hand will bubble up the stack.
  function _calcHand(hand) {
    if (hand.length == 5) {
      return hand;
    }

    var bestHand = undefined;
    for (var i = 0; i < hand.length; i++) {
      var slicedHand = hand.slice(0);
      slicedHand.splice(i, 1);
      var possibleBestHand = _calcHand(slicedHand);
      if (!bestHand || compareHands(possibleBestHand, bestHand) == 1) {
        bestHand = possibleBestHand;
      }
    }
    return bestHand;
  }

  // Wrap it so we can return hand strength data for convenience.
  return _calcHandStrengthData(_calcHand(hand));
}

function _calcHandStrengthData(hand) {
  // Calculate hand strength data.
  var histogram = _getHandHistogram(hand);

  if ('4' in histogram) {
    // Quads.
    return { strength: _constants2['default'].HAND_QUADS, hand: hand,
      ranks: [histogram['4'], histogram['1']] };
  } else if ('3' in histogram && '2' in histogram) {
    // Boat.
    return { strength: _constants2['default'].HAND_BOAT, hand: hand,
      ranks: [histogram['3'], histogram['2']] };
  } else if ('3' in histogram) {
    // Trips.
    return { strength: _constants2['default'].HAND_TRIPS, hand: hand,
      ranks: [histogram['3'], histogram['1']] };
  } else if ('2' in histogram && histogram['2'].length == 2) {
    // Two-pair.
    return { strength: _constants2['default'].HAND_TWO_PAIR, hand: hand,
      ranks: [histogram['2'], histogram['1']] };
  } else if ('2' in histogram) {
    // Pair.
    return { strength: _constants2['default'].HAND_PAIR, hand: hand,
      ranks: [histogram['2'], histogram['1']] };
  } else {
    var hasFlush = true;
    for (var i = 0; i < hand.length - 1; i++) {
      if (hand[i].suit != hand[i + 1].suit) {
        hasFlush = false;
        break;
      }
    }
    var hasStraight = hand[4].rank - hand[0].rank == 4 || hand[0].rank == 14 && hand[4].rank == 5;

    if (hasFlush && hasStraight) {
      return { strength: _constants2['default'].HAND_STR_FLUSH, hand: hand,
        ranks: [histogram['1']] };
    } else if (hasFlush) {
      return { strength: _constants2['default'].HAND_FLUSH, hand: hand,
        ranks: [histogram['1']] };
    } else if (hasStraight) {
      return { strength: _constants2['default'].HAND_STRAIGHT, hand: hand,
        ranks: [histogram['1']] };
    } else {
      // High card.
      return { strength: _constants2['default'].HAND_HIGH, hand: hand,
        ranks: [histogram['1']] };
    }
  }
}

function _getHandHistogram(hand) {
  // Get cardinalities (e.g. {'5': 2, '13': 1}).
  var cardinalities = {};
  for (var i = 0; i < hand.length; i++) {
    if (hand[i].rank in cardinalities) {
      cardinalities[hand[i].rank]++;
    } else {
      cardinalities[hand[i].rank] = 1;
    }
  }

  // Get histogram of hand (e.g. {'2': [{'5': 2}, {'13': 2}], '1': [{'1': 1}]}).
  var histogram = {};
  var compareFn = function compareFn(a, b) {
    return b - a;
  };
  for (var rank in cardinalities) {
    var cardinality = cardinalities[rank];
    if (cardinality in histogram) {
      /* Value of histogram is list of ranks that fall under the
         cardinality, sorted in reverse to make it easier to
         compare hands. */
      histogram[cardinality].push(parseInt(rank, 10));
      histogram[cardinality].sort(compareFn);
    } else {
      histogram[cardinality] = [parseInt(rank, 10)];
    }
  }

  return histogram;
}

function compareHands(handA, handB) {
  var handAStrengthData = _calcHandStrengthData(handA);
  var handBStrengthData = _calcHandStrengthData(handB);
  var handAStrength = handAStrengthData.strength;
  var handBStrength = handBStrengthData.strength;

  if (handAStrength > handBStrength) {
    return 1;
  } else if (handAStrength < handBStrength) {
    return -1;
  }

  /* If it's the same hand, compare the appropriate ranks.
     Go through the cardinalities from most-to-least dominance
     (e.g. 4 for quads, then 1 for the kicker) and compare the ranks
     e.g. 4444A vs 3333A: check the cardinality of 4 and compare 4444 vs
      3333.
     e.g. 4444A vs 4444K: check the cardinality of 4, see it's same, then
      check cardinality of 1, the kicker. */
  var handARanks = handAStrengthData.ranks;
  var handBRanks = handBStrengthData.ranks;
  for (var cardinality = 0; cardinality < handARanks.length; cardinality++) {
    for (var rank = 0; rank < handARanks[cardinality].length; rank++) {
      if (handARanks[cardinality][rank] > handBRanks[cardinality][rank]) {
        return 1;
      }
      if (handARanks[cardinality][rank] < handBRanks[cardinality][rank]) {
        return -1;
      }
    }
  }
  return 0;
}