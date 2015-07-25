import _ from 'lodash';

import c from './constants';


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
    for (let i = 0; i < 2; i++) {
        if (c.RANKS.indexOf([handA[i]]) < c.RANKS.indexOf([handB[i]])) {
            return -1;
        } else if (c.RANKS.indexOf([handA[i]]) > c.RANKS.indexOf([handB[i]])) {
            return 1;
        }
    }
}


export function flattenRange(hands) {
    /* Takes a range of hands (strings) in the format of "AKo" where A is the
       high card, K is the low card, and o indicating offsuit, and returns
       a single string indicating the hand range.

       e.g., [AA, KK, QQ] => 'QQ+'
       e.g., [AK, AKo, AQ, AQo, AJ] => ['AQo+, AJ+']
    */
    // Set ranges as arrays to do lookup + compares.
    let pairedRange = [''];  // Will only contain one hand.
    let suitedRange = [];
    let offsuitRange = [];
    for (let i = 0; i < 13; i++) {
        suitedRange.push('');
        offsuitRange.push('');
    }

    let ranges = {
        'offsuit': offsuitRange,
        'pair': pairedRange,
        'suited': suitedRange,
    };

    // Find the minimum hand of each rank.
    hands.forEach(handA => {
        // Paired ranges are always one-size. Regular ranges are indexed.
        const type = _getType(handA);

        // Get index within range array.
        const i = type == 'pair' ? 0 : RANKS[handA[0]] - 2;
        const handB = ranges[type][i];

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
        const offsuitRange = ranges.offsuit;
        const pairedRange = ranges.pair;
        const suitedRange = ranges.suited;

        // Get rid of non-playable ranges.
        let wholeRange = pairedRange.concat(suitedRange.concat(offsuitRange));
        wholeRange = wholeRange.filter(hand => hand);

        // Plus-ify.
        wholeRange = wholeRange.map(hand => {
            if (hand == 'AA' || RANKS[hand[0]] == RANKS[hand[1]] + 1) {
                // If it's aces or the best possible hand of that rank before
                // becoming a pair or a different rank, don't add a plus.
                return hand;
            }
            return hand + '+';
        });

        // Sort.
        wholeRange = _.sortBy(wholeRange, range => {
            return RANKS[range[0]];
        });

        return wholeRange.join(', ');
    }

    return _stringifyRange(ranges);
}
