/*
  Monte-Carlo runs given hands and a board.
*/
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _Deck = require('./Deck');

var _Deck2 = _interopRequireDefault(_Deck);

var _Hand = require('./Hand');

var _Hand2 = _interopRequireDefault(_Hand);

var _HoleCards = require('./HoleCards');

var _HoleCards2 = _interopRequireDefault(_HoleCards);

var Simulator = (function () {
  function Simulator(hands, board) {
    _classCallCheck(this, Simulator);

    // hands -- ['AhCd', QQ, 'AKs'].
    // board -- ['Ah', Jd', 2s'].

    this.hands = hands.map(function (hand) {
      return new _HoleCards2['default'](hand);
    });
    this.board = board;

    // TODO: need to somehow exclude cards from the deck, but allow for ranges.
    this.runs = 0;
    this.ties = 0;
    this.results = hands.map(function (hand) {
      return {
        hand: hand,
        wins: 0
      };
    });
  }

  _createClass(Simulator, [{
    key: 'run',
    value: function run(n) {
      var _this = this;

      var _loop = function (i) {
        // Generate HoleCards from the ranges, build a Deck excluding those.
        // Draw from the deck onto the board.
        var hands = _this.hands.map(function (holeCards) {
          return holeCards.get();
        });
        var deck = new _Deck2['default'](_lodash2['default'].flatten(hands));
        var board = _this.board.concat(deck.draw(c.BOARD_LENGTH - _this.board.length));

        // Build the full 7-card hands.
        var madeHands = hands.map(function (hand) {
          return new _Hand2['default'](hand.concat(board));
        });

        // Find the winning hand by looping over and comparing to the previous.
        var winningHand = undefined;
        madeHands.forEach(function (hand, i) {
          if (i === 0) {
            // Nothing to compare.
            return;
          }
          var result = hand.vs(madeHands[i - 1]);
          if (result === -1 && !winningHand) {
            // If the first hand won, set it as the winning hand.
            winningHand = i - 1;
          } else if (result === 1) {
            // New winning hand.
            winningHand = i;
          }
        });

        _this.runs++;

        if (winningHand !== undefined) {
          _this.results[winningHand].wins++;
        } else {
          _this.ties++;
        }
      };

      for (var i = 0; i < n; i++) {
        _loop(i);
      }
    }
  }, {
    key: 'getResults',
    value: function getResults() {
      var _this2 = this;

      // Aggregate results.
      return this.results.map(function (result) {
        var wins = result.wins;
        var losses = _this2.runs - result.wins;
        var ties = _this2.ties;
        var runs = _this2.runs;

        return _lodash2['default'].extend(result, {
          // equity = win% + (tie% / #hands).
          losses: losses,
          ties: ties,

          lossPct: losses / runs * 100,
          tiePct: ties / runs * 100,
          winPct: wins / runs * 100,

          ev: wins / runs + ties / runs / _this2.results.length
        });
      });
    }
  }]);

  return Simulator;
})();

exports['default'] = Simulator;
module.exports = exports['default'];