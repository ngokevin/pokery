import _ from 'lodash';
import chai from 'chai'
import chaiThings from 'chai-things';

import c from '../constants';


chai.should();
chai.use(chaiThings);


global._ = _;
global.assert = chai.assert;
global.c = c;
global.assertDeepInclude = (arr, el) => {
  arr.should.include.something.that.deep.equals(el);
};
global.assertArrayEqual = (arr, exp) => {
  // No order.
  arr = arr.map(e => e.join());
  exp = exp.map(e => e.join());
  assert.deepEqual(_.difference(arr, exp), []);
};
