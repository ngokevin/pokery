/*
  Deserializes several hole cards formats.
*/
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _constants = require('../constants');

var _constants2 = _interopRequireDefault(_constants);

var _utils = require('../utils');

var HoleCards = (function () {
  function HoleCards(cards) {
    _classCallCheck(this, HoleCards);

    this.cards = cards;

    // Parse cards.
    if (cards.constructor === String) {
      if (cards.length == 4) {
        this.initDefinedHand();
      } else if (cards.length === 3 && cards[2].toLowerCase() === 's') {
        this.initSuitedHand();
      } else if (cards.length === 2) {
        this.initRankOnlyHand();
      }
    }
  }

  _createClass(HoleCards, [{
    key: 'initDefinedHand',
    value: function initDefinedHand() {
      // Such as AhQd. Split the cards.
      var cards = this.cards;
      this.get = function () {
        return [cards.slice(0, 2), cards.slice(2)];
      };
    }
  }, {
    key: 'initSuitedHand',
    value: function initSuitedHand() {
      // Such as AQs. Assign one random suit to both cards.
      var cards = this.cards;
      this.get = function () {
        var suit = (0, _utils.randSuit)();
        return ['' + cards[0] + suit, '' + cards[1] + suit];
      };
    }
  }, {
    key: 'initRankOnlyHand',
    value: function initRankOnlyHand() {
      // Such as AA. Assign one random suit to each card w/o collisions.
      var cards = this.cards;
      this.get = function () {
        var suit1 = (0, _utils.randSuit)();
        var suit2 = (0, _utils.randSuit)();
        while (cards[0] == cards[1] && suit1 == suit2) {
          // Watch for collisions (cardA == cardB).
          suit2 = (0, _utils.randSuit)();
        }
        return ['' + cards[0] + suit1, '' + cards[1] + suit2];
      };
    }
  }, {
    key: 'toString',
    value: function toString() {
      return this.cards;
    }
  }]);

  return HoleCards;
})();

exports['default'] = HoleCards;
module.exports = exports['default'];