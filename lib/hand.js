'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.compareHands = compareHands;
exports.calcHand = calcHand;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _constants = require('./constants');

var _constants2 = _interopRequireDefault(_constants);

var _classesCard = require('./classes/Card');

var _classesCard2 = _interopRequireDefault(_classesCard);

function compareHands(handA, handB) {
  handA = _transformHand(handA);
  handB = _transformHand(handB);

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

function calcHand(hand) {
  /* Iterates through hand, recursively removing a card until we get
     five-card hands. Determines the strength of hand, returns it, and
     the best hand will bubble up the stack.
      hand -- ['Ah', 'Kd', 'Qs', 'Tc', '6s']
  */
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
  var bestHand = _calcHand(hand);
  return _calcHandStrengthData(_transformHand(bestHand));
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

function _transformHand(hand) {
  return hand.map(function (card) {
    return new _classesCard2['default'](card);
  });
}