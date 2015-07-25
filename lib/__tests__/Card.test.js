'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _classesCard = require('../classes/Card');

var _classesCard2 = _interopRequireDefault(_classesCard);

describe('Card', function () {
  it('creates a card', function () {
    var card = new _classesCard2['default']('2d');
    assert.equal(card.rank, 2);
    assert.equal(card.suit, 'd');
  });

  it('creates a card (broadway)', function () {
    var card = new _classesCard2['default']('Ah');
    assert.equal(card.rank, 14);
    assert.equal(card.suit, 'h');
  });

  it('can convert back to string', function () {
    var card = new _classesCard2['default']('Ah');
    assert.equal(card.toString(), 'Ah');
  });
});