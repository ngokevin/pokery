'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.randSuit = randSuit;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _constants = require('./constants');

var _constants2 = _interopRequireDefault(_constants);

function randSuit() {
  return _constants2['default'].SUITS[Math.floor(Math.random() * _constants2['default'].SUITS.length)];
}