/*
  Monte-Carlo runs given hands and a board.
*/
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

exports.maxHand = maxHand;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _constants = require('../constants');

var _constants2 = _interopRequireDefault(_constants);

var _Deck = require('./Deck');

var _Deck2 = _interopRequireDefault(_Deck);

var _Hand = require('./Hand');

var _Hand2 = _interopRequireDefault(_Hand);

var _Range = require('./Range');

var _Range2 = _interopRequireDefault(_Range);

var Simulator = (function () {
  function Simulator() {
    var ranges = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
    var board = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];

    _classCallCheck(this, Simulator);

    // ranges -- ['AhCd', QQ, 'AKs'].
    // board -- ['Ah', Jd', 2s'].
    this.ranges = ranges.map(function (hand) {
      return new _Range2['default'](hand);
    });
    this.board = board;

    this.runs = 0;
    this.ties = 0;
    this.results = ranges.map(function (range) {
      return {
        range: range,
        wins: 0
      };
    });
    this.getResults();
  }

  _createClass(Simulator, [{
    key: 'run',
    value: function run(n) {
      var _this = this;

      var _loop = function (i) {
        // Generate hole cards from the ranges, build a Deck excluding those.
        // Draw from the deck onto the board.
        var hands = _this.ranges.map(function (range) {
          return range.get();
        });
        var deck = new _Deck2['default'](_lodash2['default'].flatten(hands));
        var board = _this.board.concat(deck.draw(_constants2['default'].BOARD_LENGTH - _this.board.length));

        // Build the full 7-card hands.
        var madeHands = hands.map(function (hand) {
          return new _Hand2['default'](hand.concat(board));
        });
        var winningHand = maxHand(madeHands);

        _this.runs++;

        if (winningHand === -1) {
          _this.ties++;
        } else {
          _this.results[winningHand].wins++;
        }
      };

      for (var i = 0; i < n; i++) {
        _loop(i);
      }

      return this.getResults();
    }
  }, {
    key: 'getResults',
    value: function getResults() {
      var _this2 = this;

      // Aggregate results.
      this.results = this.results.map(function (result) {
        var runs = _this2.runs;
        var wins = result.wins;
        var ties = _this2.ties;
        var losses = runs - result.wins - ties;

        return _lodash2['default'].extend(result, {
          losses: losses,
          ties: ties,

          lossPct: losses / runs * 100,
          tiePct: ties / runs * 100,
          winPct: wins / runs * 100,

          // equity = win% + (tie% / #hands).
          ev: wins / runs + ties / runs / _this2.results.length
        });
      });

      return this.results;
    }
  }]);

  return Simulator;
})();

exports['default'] = Simulator;

function maxHand(hands) {
  /*
    Returns the index of the best hand, -1 if all a tie.
    hands -- List of hands (e.g., [[Ac,Ad,Ah,As,Kc,Kd,Kh]]).
  */
  // Find the winning hand by looping over and comparing to the previous.
  var winningHand = undefined;

  hands.forEach(function (hand, i) {
    if (i === 0) {
      // Nothing to compare.
      return;
    }

    var handMatchup = winningHand === undefined ? i - 1 : winningHand;
    var result = hand.vs(hands[handMatchup]);

    if (result === -1 && winningHand === undefined) {
      // If the first hand won, set it as the winning hand.
      winningHand = i - 1;
    } else if (result === 1) {
      // New winning hand.
      winningHand = i;
    }
  });

  return winningHand !== undefined ? winningHand : -1;
}