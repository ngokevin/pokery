'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _classesDeck = require('./classes/Deck');

var _classesDeck2 = _interopRequireDefault(_classesDeck);

var Simulate = (function () {
  function Simulate(hands, board) {
    _classCallCheck(this, Simulate);

    // hands -- ['AhCd', QQ, 'AKs'].
    // board -- ['Ah', Jd', 2s'].

    // TODO: for unspecified suits, need to assign a suit randomly.
    this.hands = hands;
    this.board = board;

    // TODO: need to somehow exclude cards from the deck, but allow for ranges.
    // Might need to generate a new deck on each run, and randomly choose a
    // card.
    this.results = [];
  }

  _createClass(Simulate, [{
    key: 'run',
    value: function run(n) {
      hands.forEach;

      var deck = (0, _classesDeck2['default'])(hands);
    }
  }]);

  return Simulate;
})();

exports['default'] = Simulate;
module.exports = exports['default'];