pokery
======

Node poker library for poker crunchers.


## EV Calculations

Use Pokery's Monte Carlo Simulator to run EV approximations.

The Simulator takes an array of ranges and an array of board cards.

```
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
