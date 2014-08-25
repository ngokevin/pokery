var holdem = require('../holdem');
var c = require('../constants');
var h = holdem.Holdem;


var testNewHand = {
    setUp: function(callback) {
        this.gs  = new holdem.Gs();
        var gs = this.gs;

        gs.addPlayer(0);
        gs.addPlayer(1);
        gs.newHand();

        this.button = gs.players[gs.button];
        this.bb = gs.players[gs.getNextPlayer(gs.button)];

        callback();
    },

    tearDown: function(callback) {
        callback();
    },

    testSwitchTurn: function(test) {
        var gs = this.gs;

        test.equal(gs.actionOn, 1);
        test.equal(gs.button, 1);

        gs.newHand();

        test.equal(gs.actionOn, 0);
        test.equal(gs.button, 0);

        test.done();
    }
};


var testGetNextPlayer = {
    testGetNextPlayer: function(test) {
        var gs  = new holdem.Gs();
        gs.addPlayer(0);
        gs.addPlayer(1);

        test.equal(gs.getNextPlayer(0), 1);
        test.equal(gs.getNextPlayer(1), 0);

        gs.actionOn = 0;
        test.equal(gs.getNextPlayer(), 1);
        gs.actionOn = 1;
        test.equal(gs.getNextPlayer(), 0);

        test.done();
    }
};


var testApplyAction = {
    setUp: function(callback) {
        this.gs  = new holdem.Gs();
        var gs = this.gs;

        gs.addPlayer(0);
        gs.addPlayer(1);
        gs.newHand();

        this.button = gs.players[gs.button];
        this.bb = gs.players[gs.getNextPlayer(gs.button)];

        callback();
    },

    tearDown: function(callback) {
        callback();
    },

    testNextRounds: function(test) {
        var gs = this.gs;

        test.equal(gs.currentRound, c.ROUND_PREFLOP);
        gs.applyAction({action: c.ACTION_CALL});
        test.equal(gs.currentRound, c.ROUND_PREFLOP);
        gs.applyAction({action: c.ACTION_CHECK});

        test.equal(gs.currentRound, c.ROUND_FLOP);
        gs.applyAction({action: c.ACTION_CHECK});
        test.equal(gs.currentRound, c.ROUND_FLOP);
        gs.applyAction({action: c.ACTION_CHECK});

        test.equal(gs.currentRound, c.ROUND_TURN);
        gs.applyAction({action: c.ACTION_CHECK});
        test.equal(gs.currentRound, c.ROUND_TURN);
        gs.applyAction({action: c.ACTION_CHECK});

        test.equal(gs.currentRound, c.ROUND_RIVER);
        gs.applyAction({action: c.ACTION_CHECK});
        test.equal(gs.currentRound, c.ROUND_RIVER);
        gs.applyAction({action: c.ACTION_CHECK});

        test.done();
    },

    testFold: function(test) {
        var gs = this.gs;
        var buttonChips = this.button.chips + gs.smallBlind;

        // Blind steal.
        gs.applyAction({action: c.ACTION_RAISE, amount: 50});
        gs.applyAction({action: c.ACTION_FOLD});
        test.equal(this.button.chips, buttonChips + 20);
        test.equal(gs.winner.seat, gs.button);

        test.done();
    },

    testCallAllIn: function(test) {
        var gs = this.gs;

        this.button.chips = 1990;
        this.bb.chips = 980;

        gs.applyAction({action: c.ACTION_CALL});
        gs.applyAction({action: c.ACTION_CHECK});

        gs.applyAction({action: c.ACTION_CHECK});
        gs.applyAction({action: c.ACTION_RAISE, amount: 1980});
        gs.applyAction({action: c.ACTION_CALL});

        test.equal(this.button.chips, 1000);
        test.equal(this.bb.chips, 0);

        test.done();
    },

    testCheck: function(test) {
        var gs = this.gs;
        var chips = this.bb.chips;

        gs.applyAction({action: c.ACTION_CALL});
        gs.applyAction({action: c.ACTION_CHECK});

        test.equal(this.bb.chips, chips);
        test.done();
    },

    testCheckRiver: function(test) {
        var gs = this.gs;
        var chips = this.bb.chips;

        gs.applyAction({action: c.ACTION_CALL});
        gs.applyAction({action: c.ACTION_CHECK});
        gs.applyAction({action: c.ACTION_CHECK});
        gs.applyAction({action: c.ACTION_CHECK});
        gs.applyAction({action: c.ACTION_CHECK});
        gs.applyAction({action: c.ACTION_CHECK});
        gs.applyAction({action: c.ACTION_CHECK});
        gs.applyAction({action: c.ACTION_CHECK});

        test.notEqual(gs.winner, null);
        test.done();
    },

    testBet: function(test) {
        var gs = this.gs;

        gs.applyAction({action: c.ACTION_CALL});
        gs.applyAction({action: c.ACTION_CHECK});

        // Bet subtracts from chip stack.
        var better = gs.actionOn;
        var betterStack = gs.players[better].chips;
        gs.applyAction({action: c.ACTION_RAISE, amount: 100});

        // Call subtracts from chip stack.
        var caller = gs.actionOn;
        var callerStack = gs.players[caller].chips;
        gs.applyAction({action: c.ACTION_CALL, amount: 0});

        test.equal(gs.players[better].chips, betterStack - 100);
        test.equal(gs.players[caller].chips, callerStack - 100);
        test.done();
    },

    testOverbet: function(test) {
        /* Overbetting chip stack is all-in. */
        var gs = this.gs;

        this.button.chips = 1990;
        this.bb.chips = 980;

        gs.applyAction({action: c.ACTION_RAISE, amount: 9001});
        test.equal(gs.pot, 2020);
        test.equal(this.button.chips, 0);
        test.equal(gs.toCall, 980);

        test.done();
    },

    testRaisePreflop: function(test) {
        var gs = this.gs;

        // Button min-raise.
        gs.bigBlind = 20;
        test.equal(gs.minRaiseTo, 30);
        gs.applyAction({action: c.ACTION_RAISE, amount: 30});
        test.equal(gs.pot, 50);
        test.equal(gs.toCall, 10);

        // BB reraise.
        test.equal(gs.minRaiseTo, 60);
        gs.applyAction({action: c.ACTION_RAISE, amount: 60});
        test.equal(gs.pot, 90);
        test.equal(gs.toCall, 30);
        test.done();
    },

    testMinRaise: function(test) {
        var gs = this.gs;

        gs.applyAction({action: c.ACTION_CALL});
        gs.applyAction({action: c.ACTION_CHECK});
        test.equal(gs.pot, 40);

        // BB min-bet.
        gs.bigBlind = 20;
        test.equal(gs.minRaiseTo, 20);
        gs.applyAction({action: c.ACTION_RAISE, amount: 20});
        test.equal(gs.pot, 60);
        test.equal(gs.toCall, 20);

        // Button min-raise.
        test.equal(gs.minRaiseTo, 40);
        gs.applyAction({action: c.ACTION_RAISE, amount: 40});
        test.equal(gs.pot, 100);
        test.equal(gs.toCall, 20);

        // BB reraise.
        test.equal(gs.minRaiseTo, 80);
        gs.applyAction({action: c.ACTION_RAISE, amount: 200});
        test.equal(gs.pot, 280);
        test.equal(gs.toCall, 160);

        // BB bet.
        gs.applyAction({action: c.ACTION_CALL});
        test.equal(gs.pot, 440);
        gs.applyAction({action: c.ACTION_RAISE, amount: 145});
        test.equal(gs.pot, 585);
        test.equal(gs.minRaiseTo, 290);

        test.done();
    }
};


var testAllIn = {
    setUp: function(callback) {
        this.gs  = new holdem.Gs();
        var gs = this.gs;

        gs.addPlayer(0);
        gs.addPlayer(1);
        gs.newHand();

        this.button = gs.players[gs.button];
        this.bb = gs.players[gs.getNextPlayer(gs.button)];

        callback();
    },

    testAllIn: function(test) {
        var gs = this.gs

        gs.allIn();
        test.equal(gs.boardCards.length, 5);
        test.equal(gs.currentRound, c.ROUND_RIVER);
        test.equal(gs.availableActions.length, 0);

        test.done();
    },

    testAllInPreflopBtn: function(test) {
        var gs = this.gs;
        this.button.chips = 1000;
        this.bb.chips = 3000;

        gs.applyAction({action: c.ACTION_RAISE, amount: 99999});

        test.equal(this.button.chips, 0);
        test.equal(gs.availableActions.indexOf(0) > -1, true);
        test.equal(gs.availableActions.indexOf(2) > -1, true);
        test.equal(gs.availableActions.indexOf(3) < 0, true);

        gs.applyAction({action: c.ACTION_CALL});
        gs.allIn();

        test.equal(gs.boardCards.length, 5);
        test.equal(gs.currentRound, c.ROUND_RIVER);
        test.equal(gs.availableActions.length, 0);

        test.done();
    },

    testAllInFlopBB: function(test) {
        var gs = this.gs;
        this.button.chips = 1000;
        this.bb.chips = 3000;

        gs.applyAction({action: c.ACTION_CALL});
        gs.applyAction({action: c.ACTION_CHECK});
        gs.applyAction({action: c.ACTION_RAISE, amount: 99999});

        test.equal(this.bb.chips, 0);
        test.equal(gs.availableActions.indexOf(0) > -1, true);
        test.equal(gs.availableActions.indexOf(2) > -1, true);
        test.equal(gs.availableActions.indexOf(3) < 0, true);

        gs.applyAction({action: c.ACTION_CALL});
        gs.allIn();

        test.equal(gs.boardCards.length, 5);
        test.equal(gs.currentRound, c.ROUND_RIVER);
        test.equal(gs.availableActions.length, 0);

        test.done();
    },
};

var testCalcHand = {
    setUp: function(callback) {
        callback();
    },

    tearDown: function(callback) {
        callback();
    },

    testHighCard: function(test) {
        var hand = createHand(['Ac', '3d', '5h', '7s', '9c', 'Td', 'Qh']);
        var hand = h.calcHand(hand);
        test.equal(hand.strength, c.HAND_HIGH);
        test.done();
    },

    testPair: function(test) {
        var hand = createHand(['Ac', 'Ad', '5h', '7s', '9c', 'Td', 'Qh']);
        var hand = h.calcHand(hand);
        test.equal(hand.strength, c.HAND_PAIR);
        test.done();
    },

    testTwoPair: function(test) {
        var hand = createHand(['Ac', 'Ad', '5h', '5s', '9c', 'Td', 'Qh']);
        var hand = h.calcHand(hand);
        test.equal(hand.strength, c.HAND_TWO_PAIR);
        test.done();
    },

    testTrips: function(test) {
        var hand = createHand(['Ac', 'Ad', 'Ah', '5s', '9c', 'Td', 'Qh']);
        var hand = h.calcHand(hand);
        test.equal(hand.strength, c.HAND_TRIPS);
        test.done();
    },

    testStraight: function(test) {
        var hand = createHand(['2c', '3d', '4h', '5s', '6c', 'Td', 'Th']);
        var hand = h.calcHand(hand);
        test.equal(hand.strength, c.HAND_STRAIGHT);

        // Wheel.
        var hand = createHand(['Ac', '2d', '3h', '4s', '5c', 'Td', 'Th']);
        var hand = h.calcHand(hand);
        test.equal(hand.strength, c.HAND_STRAIGHT);

        // Broadway.
        var hand = createHand(['Tc', 'Jd', 'Qh', 'Ks', 'Ac', 'Td', 'Th']);
        var hand = h.calcHand(hand);
        test.equal(hand.strength, c.HAND_STRAIGHT);
        test.done();
    },

    testFlush: function(test) {
        var hand = createHand(['Ac', '3c', '5c', '7c', '9c', 'Td', 'Th']);
        var hand = h.calcHand(hand);
        test.equal(hand.strength, c.HAND_FLUSH);
        test.done();
    },

    testFullHouse: function(test) {
        var hand = createHand(['Ac', 'Ad', 'Ah', '5s', '5c', 'Td', 'Qh']);
        var hand = h.calcHand(hand);
        test.equal(hand.strength, c.HAND_BOAT);
        test.done();
    },

    testQuads: function(test) {
        var hand = createHand(['Ac', 'Ad', 'Ah', 'As', '5c', 'Td', 'Th']);
        var hand = h.calcHand(hand);
        test.equal(hand.strength, c.HAND_QUADS);
        test.done();
    },

    testStraightFlush: function(test) {
        var hand = createHand(['2c', '3c', '4c', '5c', '6c', 'Td', 'Th']);
        var hand = h.calcHand(hand);
        test.equal(hand.strength, c.HAND_STR_FLUSH);

        // Wheel.
        var hand = createHand(['Ad', '2d', '3d', '4d', '5d', 'Th', 'Ts']);
        var hand = h.calcHand(hand);
        test.equal(hand.strength, c.HAND_STR_FLUSH);

        // Broadway.
        var hand = createHand(['Th', 'Jh', 'Qh', 'Kh', 'Ah', 'Ts', 'Tc']);
        var hand = h.calcHand(hand);
        test.equal(hand.strength, c.HAND_STR_FLUSH);
        test.done();
    },
};

var testCompareHands = {
    setUp: function(callback) {
        callback();
    },

    tearDown: function(callback) {
        callback();
    },

    testHighCard: function(test) {
        var handA = createHand(['Ac', 'Td', '7h', '5s', '2c'], true);
        var handB = createHand(['As', 'Th', '7d', '5c', '3s'], true);
        test.equal(h.compareHands(handA, handB), -1);

        var handA = createHand(['Ac', 'Td', '7h', '5s', '3c'], true);
        var handB = createHand(['As', 'Th', '7d', '5c', '3s'], true);
        test.equal(h.compareHands(handA, handB), 0);

        var handA = createHand(['Ac', 'Td', '7h', '5s', '3c'], true);
        var handB = createHand(['As', '9h', '7d', '5c', '3s'], true);
        test.equal(h.compareHands(handA, handB), 1);

        test.done();
    },

    testPair: function(test) {
        var handA = createHand(['Ac', 'Ad', '7h', '5s', '2c'], true);
        var handB = createHand(['As', 'Ah', '7d', '5c', '3s'], true);
        test.equal(h.compareHands(handA, handB), -1);

        var handA = createHand(['Kc', 'Kd', '7h', '5s', '2c'], true);
        var handB = createHand(['Ks', 'Kh', '7d', '5c', '2s'], true);
        test.equal(h.compareHands(handA, handB), 0);

        var handA = createHand(['Ac', 'Ad', '7h', '5s', '2c'], true);
        var handB = createHand(['Js', 'Jh', '7d', '5c', '3s'], true);
        test.equal(h.compareHands(handA, handB), 1);

        test.done();
    },

    testTwoPair: function(test) {
        var handA = createHand(['Tc', 'Td', '5h', '5s', 'Ac'], true);
        var handB = createHand(['Js', 'Jh', '3d', '3c', '2s'], true);
        test.equal(h.compareHands(handA, handB), -1);

        var handA = createHand(['4c', '4d', '3h', '3s', 'Ac'], true);
        var handB = createHand(['4s', '4h', '3d', '3c', 'As'], true);
        test.equal(h.compareHands(handA, handB), 0);

        var handA = createHand(['Tc', 'Td', '5h', '5s', 'Ac'], true);
        var handB = createHand(['Ts', 'Th', '5d', '5c', 'Ks'], true);
        test.equal(h.compareHands(handA, handB), 1);

        test.done();
    },

    testTrips: function(test) {
        var handA = createHand(['Tc', 'Td', 'Th', 'As', 'Kc'], true);
        var handB = createHand(['Js', 'Jh', 'Jd', '3c', '2s'], true);
        test.equal(h.compareHands(handA, handB), -1);

        var handA = createHand(['3c', '3d', '3h', '4s', '5c'], true);
        var handB = createHand(['2s', '2h', '2d', 'Qc', 'Js'], true);
        test.equal(h.compareHands(handA, handB), 1);

        test.done();
    },

    testStraight: function(test) {
        var handA = createHand(['Ac', '2d', '3h', '4s', '5c'], true);
        var handB = createHand(['Ts', 'Jh', 'Qd', 'Kc', 'As'], true);
        test.equal(h.compareHands(handA, handB), -1);

        var handA = createHand(['6c', '7d', '8h', '9s', 'Tc'], true);
        var handB = createHand(['6c', '7d', '8h', '9h', 'Td'], true);
        test.equal(h.compareHands(handA, handB), 0);

        test.done();
    },

    testFlush: function(test) {
        var handA = createHand(['Ac', 'Tc', '7c', '5c', '2c'], true);
        var handB = createHand(['Ac', 'Tc', '7c', '5c', '3c'], true);
        test.equal(h.compareHands(handA, handB), -1);

        var handA = createHand(['Ah', 'Th', '7h', '5h', '3h'], true);
        var handB = createHand(['Ah', 'Th', '7h', '5h', '3h'], true);
        test.equal(h.compareHands(handA, handB), 0);

        var handA = createHand(['As', 'Ts', '7s', '5s', '3s'], true);
        var handB = createHand(['As', '9s', '7s', '5s', '3s'], true);
        test.equal(h.compareHands(handA, handB), 1);

        test.done();
    },

    testFullHouse: function(test) {
        var handA = createHand(['Ac', 'Ad', 'Ah', '2s', '2c'], true);
        var handB = createHand(['Ac', 'Ad', 'Ah', '7c', '7s'], true);
        test.equal(h.compareHands(handA, handB), -1);

        var handA = createHand(['Ac', 'Ad', 'Ah', '2s', '2c'], true);
        var handB = createHand(['Ks', 'Kh', 'Kd', 'Qc', 'Qs'], true);
        test.equal(h.compareHands(handA, handB), 1);

        test.done();
    },

    testQuads: function(test) {
        var handA = createHand(['Ac', 'Ad', 'Ah', 'As', 'Kc'], true);
        var handB = createHand(['Kc', 'Kd', 'Kh', 'Kc', 'As'], true);
        test.equal(h.compareHands(handA, handB), 1);

        test.done();
    }
};

function createHand(cards, withStrength) {
    // List of rank-suits (['4s', 'Kd']) to list of Cards.
    var ranks = {'2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8,
                 '9': 9, 'T': 10, 'J': 11, 'Q': 12, 'K': 13, 'A': 14};

    var hand = [];
    for (var i = 0; i < cards.length; i++) {
        hand.push({
            rank: ranks[cards[i][0]],
            suit: cards[i][1]
        });
    }

    // Also calculate handStrength if specified, five-card hand only.
    if (withStrength) {
        return h.getHandStrength(hand);
    } else {
        return hand;
    }
}

// Decide what tests to run.
var tests = {
    testApplyAction: testApplyAction,
    testAllIn: testAllIn,
    testCalcHand: testCalcHand,
    testNewHand: testNewHand,
    testCompareHands: testCompareHands,
    testGetNextPlayer: testGetNextPlayer
};
for (var i in tests) {
    exports[i] = tests[i];
}
