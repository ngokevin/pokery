'use strict';

var _utils = require('../utils');

describe('randSuit', function () {
  it('generates suits', function () {
    for (var i = 0; i < 16; i++) {
      c.SUITS.should.include((0, _utils.randSuit)());
    }
  });
});