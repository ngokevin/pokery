'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _constants = require('../constants');

// Create an initial deck once.

var _constants2 = _interopRequireDefault(_constants);

var DECK = [];
_constants2['default'].RANKS.forEach(function (rank) {
  _constants2['default'].SUITS.forEach(function (suit) {
    DECK.push(rank + suit);
  });
});

var Deck = (function () {
  function Deck() {
    var alreadyDrawnCards = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

    _classCallCheck(this, Deck);

    // excludedCards -- ['Ah', '2c'].
    var cards = DECK.slice(0);

    alreadyDrawnCards.forEach(function (card) {
      // Clever way to find exactly where a card is within a deck.
      cards[_constants2['default'].RANK_INDEX[card[0]] * 4 + _constants2['default'].SUIT_INDEX[card[1]]] = null;
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
      n = n > this.cards.length ? this.cards.length : n;

      var drawnCards = [];
      for (var i = 0; i < n; i++) {
        var randomIndex = undefined;
        do {
          randomIndex = Math.floor(Math.random() * this.cards.length);
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

exports['default'] = Deck;
module.exports = exports['default'];