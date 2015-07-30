pokery
======

[![npm version](https://badge.fury.io/js/pokery.svg)](http://badge.fury.io/js/pokery)
[![travis build](https://travis-ci.org/ngokevin/pokery.svg)](https://travis-ci.org/ngokevin/pokery)

Node poker library for poker crunchers. Also compatible with Browserify.

Reviving the ghost of PokerStove for all platforms.


## EV Approximations

Pokery has a Monte Carlo Simulator to run EV approximations.

The Simulator takes an array of ranges and an array of board cards.

```javascript
> import Simulator from 'pokery';
> new Simulator(['AhAd', 'KK', 'JTs', '72o'], ['Qd']).run();
[ { range: 'AhAd',
    wins: 605,
    losses: 395,
    ties: 0,
    lossPct: 39.5,
    tiePct: 0,
    winPct: 60.5,
    ev: 0.605 },
  { range: 'KK',
    wins: 120,
    losses: 880,
    ties: 0,
    lossPct: 88,
    tiePct: 0,
    winPct: 12,
    ev: 0.12 },
  { range: 'JTs',
    wins: 207,
    losses: 793,
    ties: 0,
    lossPct: 79.3,
    tiePct: 0,
    winPct: 20.7,
    ev: 0.207 },
  { range: '72o',
    wins: 68,
    losses: 932,
    ties: 0,
    lossPct: 93.2,
    tiePct: 0,
    winPct: 6.800000000000001,
    ev: 0.068 } ]
```

## Command Line Usage

Pokery works on the command line!

```bash
$ pokery simulate -h AA -h KK -b 2d3h4s -n 5000
Running AA vs. KK on 2d,3h,4s board, 5000 times
[ { range: 'AA',
    wins: 807,
    losses: 191,
    ties: 2,
    lossPct: 19.1,
    tiePct: 0.2,
    winPct: 80.7,
    ev: 0.808 },
  { range: 'KK',
    wins: 191,
    losses: 807,
    ties: 2,
    lossPct: 80.7,
    tiePct: 0.2,
    winPct: 19.1,
    ev: 0.192 } ]
```

## Hand Evaluations

Pokery can evaluate and compare hands.

To be more portable and use less memory, Pokery currently does not use a lookup
table, which would be 250MB.

```javascript
> import Hand from 'pokery';
> new Hand(['Ac', 'Ad', 'Ah', 'As', 'Jc', 'Td', '2h']);
{ strength: 7,
  ranks: [ [ 14 ], [ 11 ] ],
  cards: [ 'Ac', 'Ad', 'Ah', 'As', 'Jc' ] }
> new Hand(['Kc', '3d', '4h', '7s', '6c', '5d', 'Kh']);
{ strength: 4,
  ranks: [ [ 7, 6, 5, 4, 3 ] ],
  cards: [ '3d', '4h', '7s', '6c', '5d' ] }
```

## Range Parsing

Pokery can expressively breakdown hand ranges and return random hands from a
range.

You can learn more about [hand range
grammar](http://pokerini.com/help/holdem_range_notation.php).

```javascript
> import Range from 'pokery';
> new Range('AQ').hands
[ ['Ac', 'Qc'],
  ['Ac', 'Qd'],
  ['Ac', 'Qh'],
  ['Ac', 'Qs'],
  ['Ah', 'Qc'],
  ['Ah', 'Qd'],
  ['Ah', 'Qh'],
  ['Ah', 'Qs'],
  ['Ad', 'Qc'],
  ['Ad', 'Qd'],
  ['Ad', 'Qh'],
  ['Ad', 'Qs'],
  ['As', 'Qc'],
  ['As', 'Qd'],
  ['As', 'Qh'],
  ['As', 'Qs'] ]
> new Range('55').hands
[ ['5c', '5d'],
  ['5c', '5h'],
  ['5c', '5s'],
  ['5d', '5h'],
  ['5d', '5s'],
  ['5h', '5s'] ]
> new Range('QQ, 93s').hands
[ ['Qc', 'Qd'],
  ['Qc', 'Qh'],
  ['Qc', 'Qs'],
  ['Qd', 'Qh'],
  ['Qd', 'Qs'],
  ['Qh', 'Qs']
  ['9c', '3c'],
  ['9d', '3d'],
  ['9h', '3h'],
  ['9s', '3s'] ]
```
