(function(exports) {
    // Action constants.
    exports.ACTION_FOLD = 0;
    exports.ACTION_CHECK = 1;
    exports.ACTION_CALL = 2;
    exports.ACTION_RAISE = 3;

    exports.actions = {};
    exports.actions[exports.ACTION_FOLD] = 'folded';
    exports.actions[exports.ACTION_CHECK] = 'checked';
    exports.actions[exports.ACTION_CALL] = 'called';
    exports.actions[exports.ACTION_RAISE] = 'raised to';

    // Round constants.
    exports.ROUND_PREFLOP = 0;
    exports.ROUND_FLOP = 1;
    exports.ROUND_TURN = 2;
    exports.ROUND_RIVER = 3;
    exports.roundList = [exports.ROUND_PREFLOP, exports.ROUND_FLOP,
                         exports.ROUND_TURN, exports.ROUND_RIVER];

    exports.rounds = {};
    exports.rounds[exports.ROUND_PREFLOP] = 'preflop';
    exports.rounds[exports.ROUND_FLOP] = 'flop';
    exports.rounds[exports.ROUND_TURN] = 'turn';
    exports.rounds[exports.ROUND_RIVER] = 'river';

    // Hand strength constants.
    exports.HAND_HIGH = 0;
    exports.HAND_PAIR = 1;
    exports.HAND_TWO_PAIR = 2;
    exports.HAND_TRIPS = 3;
    exports.HAND_STRAIGHT = 4;
    exports.HAND_FLUSH = 5;
    exports.HAND_BOAT = 6;
    exports.HAND_QUADS = 7;
    exports.HAND_STR_FLUSH = 8;

    exports.hands = {};
    exports.hands[exports.HAND_HIGH] = 'High Card';
    exports.hands[exports.HAND_PAIR] = 'Pair';
    exports.hands[exports.HAND_TWO_PAIR] = 'Two Pair';
    exports.hands[exports.HAND_TRIPS] = 'Three-of-a-kind';
    exports.hands[exports.HAND_STRAIGHT] = 'Straight';
    exports.hands[exports.HAND_FLUSH] = 'Flush';
    exports.hands[exports.HAND_BOAT] = 'Full House';
    exports.hands[exports.HAND_QUADS] = 'Four-of-a-kind';
    exports.hands[exports.HAND_STR_FLUSH] = 'Straight Flush';
})(typeof exports === 'undefined' ? this['c'] = {} : exports);
