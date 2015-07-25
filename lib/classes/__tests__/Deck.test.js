'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _Deck = require('../Deck');

var _Deck2 = _interopRequireDefault(_Deck);

describe('Deck', function () {
  it('has 52 cards', function () {
    var deck = new _Deck2['default']();
    assert.equal(_.uniq(deck.cards).length, 52);
  });

  it('can draw 0 cards', function () {
    var deck = new _Deck2['default']();
    var cards = deck.draw(0);
    assert.equal(cards.length, 0);
  });

  it('can draw 1 card', function () {
    var deck = new _Deck2['default']();
    var cards = deck.draw(1);
    assert.equal(cards.length, 1);
    cards.forEach(function (card) {
      assert.equal(card.constructor, String);
      assert.equal(card.length, 2);
    });
  });

  it('can draw 2 cards', function () {
    var deck = new _Deck2['default']();
    var cards = deck.draw(2);
    assert.equal(cards.length, 2);
    cards.forEach(function (card) {
      assert.equal(card.constructor, String);
      assert.equal(card.length, 2);
    });
  });

  it('can draws unique cards', function () {
    var deck = new _Deck2['default']();
    var cards = deck.draw(51);
    assert.equal(_.uniq(cards).length, 51);
  });

  it('can exclude cards from deck constructor', function () {
    var alreadyDrawnCards = ['Ad', 'Ah', 'Kd', 'Ks'];
    var deck = new _Deck2['default'](alreadyDrawnCards);

    assert.equal(deck.cards.length, 48);

    alreadyDrawnCards.forEach(function (card) {
      assert.equal(deck.cards.indexOf(card), -1);
    });
  });
});