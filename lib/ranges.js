'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports.flattenRange = flattenRange;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _constants = require('./constants');

var _constants2 = _interopRequireDefault(_constants);

function _getType(hand) {
    // Return suited, pair, or offsuit.
    if (hand.length === 3) {
        return 'offsuit';
    } else if (hand[0] == hand[1]) {
        return 'pair';
    } else {
        return 'suited';
    }
}

function _compareHands(handA, handB) {
    /* Compares two-card hands.
       Returns -1 if A < B.
       Returns 0 if A < B.
       Returns 1 if A < B.
    */
    if (handA == handB) {
        return 0;
    }
    for (var i = 0; i < 2; i++) {
        if (_constants2['default'].RANKS.indexOf([handA[i]]) < _constants2['default'].RANKS.indexOf([handB[i]])) {
            return -1;
        } else if (_constants2['default'].RANKS.indexOf([handA[i]]) > _constants2['default'].RANKS.indexOf([handB[i]])) {
            return 1;
        }
    }
}

function flattenRange(hands) {
    /* Takes a range of hands (strings) in the format of "AKo" where A is the
       high card, K is the low card, and o indicating offsuit, and returns
       a single string indicating the hand range.
        e.g., [AA, KK, QQ] => 'QQ+'
       e.g., [AK, AKo, AQ, AQo, AJ] => ['AQo+, AJ+']
    */
    // Set ranges as arrays to do lookup + compares.
    var pairedRange = ['']; // Will only contain one hand.
    var suitedRange = [];
    var offsuitRange = [];
    for (var i = 0; i < 13; i++) {
        suitedRange.push('');
        offsuitRange.push('');
    }

    var ranges = {
        'offsuit': offsuitRange,
        'pair': pairedRange,
        'suited': suitedRange
    };

    // Find the minimum hand of each rank.
    hands.forEach(function (handA) {
        // Paired ranges are always one-size. Regular ranges are indexed.
        var type = _getType(handA);

        // Get index within range array.
        var i = type == 'pair' ? 0 : RANKS[handA[0]] - 2;
        var handB = ranges[type][i];

        if (!handB) {
            // Initialize the minimum hand.
            ranges[type][i] = handA;
            return;
        }

        // Set the worse hand since we want minimum ranges.
        ranges[type][i] = _compareHands(handA, handB) < 0 ? handA : handB;
    });

    function _stringifyRange(ranges) {
        /* Convert arrayed ranges to human-readable form. */
        var offsuitRange = ranges.offsuit;
        var pairedRange = ranges.pair;
        var suitedRange = ranges.suited;

        // Get rid of non-playable ranges.
        var wholeRange = pairedRange.concat(suitedRange.concat(offsuitRange));
        wholeRange = wholeRange.filter(function (hand) {
            return hand;
        });

        // Plus-ify.
        wholeRange = wholeRange.map(function (hand) {
            if (hand == 'AA' || RANKS[hand[0]] == RANKS[hand[1]] + 1) {
                // If it's aces or the best possible hand of that rank before
                // becoming a pair or a different rank, don't add a plus.
                return hand;
            }
            return hand + '+';
        });

        // Sort.
        wholeRange = _lodash2['default'].sortBy(wholeRange, function (range) {
            return RANKS[range[0]];
        });

        return wholeRange.join(', ');
    }

    return _stringifyRange(ranges);
}