import c from './constants';


export function compareHands(handA, handB) {
  const handAStrengthData = _calcHandStrengthData(handA);
  const handBStrengthData = _calcHandStrengthData(handB);
  const handAStrength = handAStrengthData.strength;
  const handBStrength = handBStrengthData.strength;

  if (handAStrength > handBStrength) {
    return 1;
  } else if (handAStrength < handBStrength) {
    return -1;
  }

  /* If it's the same hand, compare the appropriate ranks.
     Go through the cardinalities from most-to-least dominance
     (e.g. 4 for quads, then 1 for the kicker) and compare the ranks
     e.g. 4444A vs 3333A: check the cardinality of 4 and compare 4444 vs
      3333.
     e.g. 4444A vs 4444K: check the cardinality of 4, see it's same, then
      check cardinality of 1, the kicker. */
  const handARanks = handAStrengthData.ranks;
  const handBRanks = handBStrengthData.ranks;
  for (let cardinality = 0; cardinality < handARanks.length; cardinality++) {
    for (let rank = 0; rank < handARanks[cardinality].length; rank++) {
      if (handARanks[cardinality][rank] > handBRanks[cardinality][rank]) {
        return 1;
      }
      if (handARanks[cardinality][rank] < handBRanks[cardinality][rank]) {
        return -1;
      }
    }
  }
  return 0;
}


export function calcHand(hand) {
  // Iterates through hand, recursively removing a card until we get
  // five-card hands. Determines the strength of hand, returns it, and
  // the best hand will bubble up the stack.
  function _calcHand(hand) {
    if (hand.length == 5) {
      return hand;
    }

    let bestHand;
    for (let i = 0; i < hand.length; i++) {
      let slicedHand = hand.slice(0);
      slicedHand.splice(i, 1);
      const possibleBestHand = _calcHand(slicedHand);
      if (!bestHand || compareHands(possibleBestHand, bestHand) == 1) {
        bestHand = possibleBestHand;
      }
    }
    return bestHand;
  }

  // Wrap it so we can return hand strength data for convenience.
  return _calcHandStrengthData(_calcHand(hand));
}


function _calcHandStrengthData(hand) {
  // Calculate hand strength data.
  const histogram = _getHandHistogram(hand);

  if ('4' in histogram) {
    // Quads.
    return {strength: c.HAND_QUADS, hand: hand,
            ranks: [histogram['4'], histogram['1']]};
  } else if ('3' in histogram && '2' in histogram) {
    // Boat.
    return {strength: c.HAND_BOAT, hand: hand,
            ranks: [histogram['3'], histogram['2']]};
  } else if ('3' in histogram) {
    // Trips.
    return {strength: c.HAND_TRIPS, hand: hand,
            ranks: [histogram['3'], histogram['1']]};
  } else if ('2' in histogram && histogram['2'].length == 2) {
    // Two-pair.
    return {strength: c.HAND_TWO_PAIR, hand: hand,
            ranks: [histogram['2'], histogram['1']]};
  } else if ('2' in histogram) {
    // Pair.
    return {strength: c.HAND_PAIR, hand: hand,
            ranks: [histogram['2'], histogram['1']]};
  } else {
    let hasFlush = true;
    for (let i = 0; i < hand.length - 1; i++) {
      if (hand[i].suit != hand[i + 1].suit) {
        hasFlush = false;
        break;
      }
    }
    const hasStraight = (hand[4].rank - hand[0].rank == 4 ||
                         (hand[0].rank == 14 && hand[4].rank == 5));

    if (hasFlush && hasStraight) {
      return {strength: c.HAND_STR_FLUSH, hand: hand,
              ranks: [histogram['1']]};
    } else if (hasFlush) {
      return {strength: c.HAND_FLUSH, hand: hand,
              ranks: [histogram['1']]};
    } else if (hasStraight) {
      return {strength: c.HAND_STRAIGHT, hand: hand,
              ranks: [histogram['1']]};
    } else {
      // High card.
      return {strength: c.HAND_HIGH, hand: hand,
              ranks: [histogram['1']]};
    }
  }
}


function _getHandHistogram(hand) {
  // Get cardinalities (e.g. {'5': 2, '13': 1}).
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
