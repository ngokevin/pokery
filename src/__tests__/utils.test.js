import {randSuit} from '../utils';


describe('randSuit', () => {
  it ('generates suits', () => {
    for (let i = 0; i < 16; i++) {
      c.SUITS.should.include(randSuit());
    }
  });
});
