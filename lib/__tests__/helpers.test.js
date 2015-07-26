'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiThings = require('chai-things');

var _chaiThings2 = _interopRequireDefault(_chaiThings);

var _constants = require('../constants');

var _constants2 = _interopRequireDefault(_constants);

_chai2['default'].should();
_chai2['default'].use(_chaiThings2['default']);

global._ = _lodash2['default'];
global.assert = _chai2['default'].assert;
global.c = _constants2['default'];
global.assertDeepInclude = function (arr, e) {
  arr.should.include.something.that.deep.equals(e);
};