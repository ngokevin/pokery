import c from './constants';


export function randSuit() {
  return c.SUITS[Math.floor(Math.random() * c.SUITS.length)];
}
