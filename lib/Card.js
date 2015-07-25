/*
  Deserializes a card ('Ah') to an object ({rank: 14, suit: 'h'}).
*/
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _constants = require('./constants');

var _constants2 = _interopRequireDefault(_constants);

var Card = (function () {
  function Card(card) {
    _classCallCheck(this, Card);

    this.card = card;
    this.rank = _constants2['default'].RANK_STRENGTHS[card[0]];
    this.suit = card[1];
  }

  _createClass(Card, [{
    key: 'toString',
    value: function toString() {
      return this.card;
    }
  }]);

  return Card;
})();

exports['default'] = Card;
module.exports = exports['default'];