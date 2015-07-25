'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _Card = require('../Card');

var _Card2 = _interopRequireDefault(_Card);

describe('Card', function () {
  it('creates a card', function () {
    var card = new _Card2['default']('2d');
    assert.equal(card.rank, 2);
    assert.equal(card.suit, 'd');
  });

  it('creates a card (broadway)', function () {
    var card = new _Card2['default']('Ah');
    assert.equal(card.rank, 14);
    assert.equal(card.suit, 'h');
  });

  it('can convert back to string', function () {
    var card = new _Card2['default']('Ah');
    assert.equal(card.toString(), 'Ah');
  });
});