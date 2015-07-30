import Range from '../Range';
import Simulator from '../Simulator';


describe('Simulator.constructor', () => {
  it('sets this.ranges', () => {
    const sim = new Simulator(['AhAd', 'KhKd', '5s3c'], []);
    assert.equal(sim.ranges.length, 3);

    sim.ranges.forEach(hand => {
      assert.equal(hand.constructor, Range);
    });

    assert.deepEqual(sim.ranges[0].get(), ['Ah', 'Ad']);
    assert.deepEqual(sim.ranges[1].get(), ['Kh', 'Kd']);
    assert.deepEqual(sim.ranges[2].get(), ['5s', '3c']);
  });

  it('sets this.board', () => {
    const sim = new Simulator(['AA', 'QTs'], ['Kd', '9h', '2s']);
    assert.equal(sim.board.length, 3);
    assert.deepEqual(sim.board, ['Kd', '9h', '2s']);
  });

  it('sets this.results', () => {
    const sim = new Simulator(['AA', 'QTs'], ['Kd', '9h', '2s']);
    assert.equal(sim.results.length, 2);
  });
});


describe('Simulator.run', () => {
  it('sets results', () => {
    const sim = new Simulator(['AA', 'JJ', '72'],
                              ['Kc', 'Kd', 'Kh', 'Ks', 'Qc']);
    sim.run(5);

    assert.equal(sim.runs, 5);

    assert.equal(sim.results[0].range, 'AA');
    assert.equal(sim.results[0].wins, 5);

    assert.equal(sim.results[1].range, 'JJ');
    assert.equal(sim.results[1].wins, 0);

    assert.equal(sim.results[2].range, '72');
    assert.equal(sim.results[2].wins, 0);
  });

  it('is somewhat accurate (AA vs KK)', () => {
    const sim = new Simulator(['AA', 'KK']);
    const results = sim.run(1000);

    assert.equal(sim.failedRuns, 0);

    assert.equal(results[0].range, 'AA');
    assert.isAbove(results[0].wins, 700);
    assert.isBelow(results[0].losses, 300);
    assert.isBelow(results[0].ties, 50);
    assert.isBelow(results[0].lossPct, 30);
    assert.isAbove(results[0].winPct, 70);
    assert.isAbove(results[0].ev, .75);

    assert.equal(results[1].range, 'KK');
    assert.isBelow(results[1].wins, 300);
    assert.isAbove(results[1].losses, 700);
    assert.isBelow(results[1].ties, 50);
    assert.isAbove(results[1].lossPct, 70);
    assert.isBelow(results[1].winPct, 30);
    assert.isBelow(results[1].ev, .30);
  });

  it('records collisions', () => {
    const sim = new Simulator(['8h7d', '8h7d']);
    const results = sim.run(1000);
    assert.equal(sim.failedRuns, 1000);

    assert.equal(results[0].wins, 0);
    assert.equal(results[1].wins, 0);
  });
});


describe('Simulator.getResults', () => {
  it('aggregates results', () => {
    const sim = new Simulator(['AA', 'JJ', '72'],
                              ['Kc', 'Kd', 'Kh', 'Ks', 'Qc']);
    const results = sim.run(5);

    const AA = results[0];
    assert.equal(AA.range, 'AA');
    assert.equal(AA.wins, 5);
    assert.equal(AA.losses, 0);
    assert.equal(AA.ties, 0);
    assert.equal(AA.lossPct, 0);
    assert.equal(AA.winPct, 100);
    assert.equal(AA.ev, 1);

    const sDeuce = results[2];
    assert.equal(sDeuce.range, '72');
    assert.equal(sDeuce.wins, 0);
    assert.equal(sDeuce.losses, 5);
    assert.equal(sDeuce.ties, 0);
    assert.equal(sDeuce.lossPct, 100);
    assert.equal(sDeuce.winPct, 0);
    assert.equal(sDeuce.ev, 0);
  });
});
