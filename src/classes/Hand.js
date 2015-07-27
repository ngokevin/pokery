import _ from 'lodash';

import c from '../constants';
import Card from './Card';


export default class Hand {
  constructor(cards) {
    /*
      From a list of cards of at least 5, calculate the hand strength of the
      best five-card combination.

      cards -- list of cards either in 'Ah' format or as Card('Ah').
    */
    // Deserialize cards from strings to Cards if necessary.
    let hand = cards.map(card => {
      return card.constructor === String ? new Card(card) : card;
    });

    // Reduce the hand down to the best five-card combination if needed.
    if (hand.length > 5) {
      hand = reduceHand(hand);
    }

    // Calculate strength of hand.
    const strength = getHandStrength(hand);
    this.strength = strength.strength;
    this.ranks = strength.ranks;

    // Set serialized cards.
    this.cards = hand.map(card => {
      return card.constructor === String ? card : card.toString();
    });
  }
  vs(handB) {
    /*
      Comparator for this Hand against another Hand.

      handB -- new Hand(['Ah', 'Ad', 'As', 'Ac', '2d']).
    */
    if (this.strength > handB.strength) {
      return 1;
    } else if (this.strength < handB.strength) {
      return -1;
    }
    /*
      If it's the same hand, compare the appropriate ranks.
      Go through the cardinalities from most-to-least dominance

      e.g. 4 for quads, then 1 for the kicker and compare the ranks
      e.g. 4444A vs 3333A: check the cardinality of 4 and compare 4444 vs 3333.
      e.g. 4444A vs 4444K: check the cardinality of 4, see it's same, then
           check cardinality of 1, the kicker.
    */
    for (let cardinality = 0; cardinality < this.ranks.length; cardinality++) {
      for (let rank = 0; rank < this.ranks[cardinality].length; rank++) {
        if (this.ranks[cardinality][rank] > handB.ranks[cardinality][rank]) {
          return 1;
        }
        if (this.ranks[cardinality][rank] < handB.ranks[cardinality][rank]) {
          return -1;
        }
        if (this.strength === c.HAND_STRAIGHT) {
          // Only need to compare the first card for straight.
          return 0;
        }
      }
    }
    return 0;
  }
}


function reduceHand(hand) {
  /*
    Iterates through hand, recursively removing a card until we get
    five-card hands. Determines the strength of hand, returns it, and
    the best hand will bubble up the stack.

    hand -- ['Ah', 'Kd', 'Qs', 'Tc', '6s'].
  */
  function _reduceHand(hand) {
    if (hand.length == 5) {
      return hand;
    }

    let bestHand;
    for (let i = 0; i < hand.length; i++) {
      let slicedHand = hand.slice(0);
      slicedHand.splice(i, 1);
      let possibleBestHand = _reduceHand(slicedHand);
      if (!bestHand ||
          new Hand(possibleBestHand).vs(new Hand(bestHand)) == 1) {
        bestHand = possibleBestHand;
      }
    }
    return bestHand;
  }

  return _reduceHand(hand);
}


function getHandStrength(hand) {
  /*
    Calculates hand strength data.

    hand -- [Card('Ah'), Card('Kd'), Card('Qs'), Card('Tc'), Card('6s')].
  */
  const histogram = getHandHistogram(hand);

  if ('4' in histogram) {
    // Quads.
    return {strength: c.HAND_QUADS, ranks: [histogram['4'], histogram['1']]};
  } else if ('3' in histogram && '2' in histogram) {
    // Boat.
    return {strength: c.HAND_BOAT, ranks: [histogram['3'], histogram['2']]};
  } else if ('3' in histogram) {
    // Trips.
    return {strength: c.HAND_TRIPS, ranks: [histogram['3'], histogram['1']]};
  } else if ('2' in histogram && histogram['2'].length == 2) {
    // Two-pair.
    return {strength: c.HAND_TWO_PAIR,
            ranks: [histogram['2'], histogram['1']]};
  } else if ('2' in histogram) {
    // Pair.
    return {strength: c.HAND_PAIR, ranks: [histogram['2'], histogram['1']]};
  } else {
    let hasFlush = true;
    for (let i = 0; i < hand.length - 1; i++) {
      if (hand[i].suit != hand[i + 1].suit) {
        hasFlush = false;
        break;
      }
    }

    hand = _.sortBy(hand, hand => hand.rank * -1);
    const hasStraight = (
      hand[0].rank - hand[4].rank == 4 ||
      _.isEqual(hand.map(card => card.rank), [14, 5, 4, 3, 2]));

    if (hasFlush && hasStraight) {
      return {strength: c.HAND_STR_FLUSH, ranks: [histogram['1']]};
    } else if (hasFlush) {
      return {strength: c.HAND_FLUSH, ranks: [histogram['1']]};
    } else if (hasStraight) {
      return {strength: c.HAND_STRAIGHT, ranks: [histogram['1']]};
    } else {
      // High card.
      return {strength: c.HAND_HIGH, ranks: [histogram['1']]};
    }
  }
}


function getHandHistogram(hand) {
  /*
    Get cardinalities (e.g. {'5': 2, '13': 1}).

    hand -- [Card('Ah'), Card('Kd'), Card('Qs'), Card('Tc'), Card('6s')].
  */
  let cardinalities = {};
  for (let i = 0; i < hand.length; i++) {
    if (hand[i].rank in cardinalities) {
      cardinalities[hand[i].rank]++;
    } else {
      cardinalities[hand[i].rank] = 1;
    }
  }

  // Get histogram of hand (e.g. {'2': [{'5': 2}, {'13': 2}], '1': [{'1': 1}]}).
  let histogram = {};
  const compareFn = (a, b) => b - a;
  for (let rank in cardinalities) {
    let cardinality = cardinalities[rank];
    if (cardinality in histogram) {
      /* Value of histogram is list of ranks that fall under the
         cardinality, sorted in reverse to make it easier to
         compare hands. */
      histogram[cardinality].push(parseInt(rank, 10));
      histogram[cardinality].sort(compareFn);
    } else {
      histogram[cardinality] = [parseInt(rank, 10)];
    }
  }

  return histogram;
}
