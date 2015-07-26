import _ from 'lodash';
import chai from 'chai'
import chaiThings from 'chai-things';

import c from '../constants';


chai.should();
chai.use(chaiThings);


global._ = _;
global.assert = chai.assert;
global.c = c;
global.assertDeepInclude = (arr, e) => {
  arr.should.include.something.that.deep.equals(e);
};
