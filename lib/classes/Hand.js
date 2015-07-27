'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _constants = require('../constants');

var _constants2 = _interopRequireDefault(_constants);

var _Card = require('./Card');

var _Card2 = _interopRequireDefault(_Card);

var Hand = (function () {
  function Hand(cards) {
    _classCallCheck(this, Hand);

    /*
      From a list of cards of at least 5, calculate the hand strength of the
      best five-card combination.
       cards -- list of cards either in 'Ah' format or as Card('Ah').
    */
    // Deserialize cards from strings to Cards if necessary.
    var hand = cards.map(function (card) {
      return card.constructor === String ? new _Card2['default'](card) : card;
    });

    // Reduce the hand down to the best five-card combination if needed.
    if (hand.length > 5) {
      hand = reduceHand(hand);
    }

    // Calculate strength of hand.
    var strength = getHandStrength(hand);
    this.strength = strength.strength;
    this.ranks = strength.ranks;

    // Set serialized cards.
    this.cards = cards.map(function (card) {
      return card.constructor === String ? card : card.toString();
    });
  }

  _createClass(Hand, [{
    key: 'vs',
    value: function vs(handB) {
      /*
        Comparator for this Hand against another Hand.
         handB -- new Hand(['Ah', 'Ad', 'As', 'Ac', '2d']).
      */
      if (this.strength > handB.strength) {
        return 1;
      } else if (this.strength < handB.strength) {
        return -1;
      }
      /*
        If it's the same hand, compare the appropriate ranks.
        Go through the cardinalities from most-to-least dominance
         e.g. 4 for quads, then 1 for the kicker and compare the ranks
        e.g. 4444A vs 3333A: check the cardinality of 4 and compare 4444 vs 3333.
        e.g. 4444A vs 4444K: check the cardinality of 4, see it's same, then
             check cardinality of 1, the kicker.
      */
      for (var cardinality = 0; cardinality < this.ranks.length; cardinality++) {
        for (var rank = 0; rank < this.ranks[cardinality].length; rank++) {
          if (this.ranks[cardinality][rank] > handB.ranks[cardinality][rank]) {
            return 1;
          }
          if (this.ranks[cardinality][rank] < handB.ranks[cardinality][rank]) {
            return -1;
          }
          if (this.strength === _constants2['default'].HAND_STRAIGHT) {
            // Only need to compare the first card for straight.
            return 0;
          }
        }
      }
      return 0;
    }
  }]);

  return Hand;
})();

exports['default'] = Hand;

function reduceHand(hand) {
  /*
    Iterates through hand, recursively removing a card until we get
    five-card hands. Determines the strength of hand, returns it, and
    the best hand will bubble up the stack.
     hand -- ['Ah', 'Kd', 'Qs', 'Tc', '6s'].
  */
  function _reduceHand(hand) {
    if (hand.length == 5) {
      return hand;
    }

    var bestHand = undefined;
    for (var i = 0; i < hand.length; i++) {
      var slicedHand = hand.slice(0);
      slicedHand.splice(i, 1);
      var possibleBestHand = _reduceHand(slicedHand);
      if (!bestHand || new Hand(possibleBestHand).vs(new Hand(bestHand)) == 1) {
        bestHand = possibleBestHand;
      }
    }
    return bestHand;
  }

  return _reduceHand(hand);
}

function getHandStrength(hand) {
  /*
    Calculates hand strength data.
     hand -- [Card('Ah'), Card('Kd'), Card('Qs'), Card('Tc'), Card('6s')].
  */
  var histogram = getHandHistogram(hand);

  if ('4' in histogram) {
    // Quads.
    return { strength: _constants2['default'].HAND_QUADS, ranks: [histogram['4'], histogram['1']] };
  } else if ('3' in histogram && '2' in histogram) {
    // Boat.
    return { strength: _constants2['default'].HAND_BOAT, ranks: [histogram['3'], histogram['2']] };
  } else if ('3' in histogram) {
    // Trips.
    return { strength: _constants2['default'].HAND_TRIPS, ranks: [histogram['3'], histogram['1']] };
  } else if ('2' in histogram && histogram['2'].length == 2) {
    // Two-pair.
    return { strength: _constants2['default'].HAND_TWO_PAIR,
      ranks: [histogram['2'], histogram['1']] };
  } else if ('2' in histogram) {
    // Pair.
    return { strength: _constants2['default'].HAND_PAIR, ranks: [histogram['2'], histogram['1']] };
  } else {
    var hasFlush = true;
    for (var i = 0; i < hand.length - 1; i++) {
      if (hand[i].suit != hand[i + 1].suit) {
        hasFlush = false;
        break;
      }
    }

    hand = _lodash2['default'].sortBy(hand, function (hand) {
      return hand.rank * -1;
    });
    var hasStraight = hand[0].rank - hand[4].rank == 4 || _lodash2['default'].isEqual(hand.map(function (card) {
      return card.rank;
    }), [14, 5, 4, 3, 2]);

    if (hasFlush && hasStraight) {
      return { strength: _constants2['default'].HAND_STR_FLUSH, ranks: [histogram['1']] };
    } else if (hasFlush) {
      return { strength: _constants2['default'].HAND_FLUSH, ranks: [histogram['1']] };
    } else if (hasStraight) {
      return { strength: _constants2['default'].HAND_STRAIGHT, ranks: [histogram['1']] };
    } else {
      // High card.
      return { strength: _constants2['default'].HAND_HIGH, ranks: [histogram['1']] };
    }
  }
}

function getHandHistogram(hand) {
  /*
    Get cardinalities (e.g. {'5': 2, '13': 1}).
     hand -- [Card('Ah'), Card('Kd'), Card('Qs'), Card('Tc'), Card('6s')].
  */
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
module.exports = exports['default'];