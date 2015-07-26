import HoleCards from '../HoleCards';
import Simulator from '../Simulator';


describe('Simulator.constructor', () => {
  it('sets this.hands', () => {
    const sim = new Simulator(['AhAd', 'KhKd', '5s3c'], []);
    assert.equal(sim.hands.length, 3);

    sim.hands.forEach(hand => {
      assert.equal(hand.constructor, HoleCards);
    });

    assert.deepEqual(sim.hands[0].get(), ['Ah', 'Ad']);
    assert.deepEqual(sim.hands[1].get(), ['Kh', 'Kd']);
    assert.deepEqual(sim.hands[2].get(), ['5s', '3c']);
  });

  it('sets this.board', () => {
    const sim = new Simulator(['AA', 'QTs'], ['Kd', '9h', '2s']);
    assert.equal(sim.board.length, 3);
    assert.deepEqual(sim.board, ['Kd', '9h', '2s']);
  });

  it('sets this.result', () => {
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

    assert.equal(sim.results[0].hand, 'AA');
    assert.equal(sim.results[0].wins, 5);

    assert.equal(sim.results[1].hand, 'JJ');
    assert.equal(sim.results[1].wins, 0);

    assert.equal(sim.results[2].hand, '72');
    assert.equal(sim.results[2].wins, 0);
  });
});


describe('Simulator.getResults', () => {
  it('aggregates results', () => {
    const sim = new Simulator(['AA', 'JJ', '72'],
                              ['Kc', 'Kd', 'Kh', 'Ks', 'Qc']);
    sim.run(5);
    const results = sim.getResults();

    const AA = results[0];
    assert.equal(AA.hand, 'AA');
    assert.equal(AA.wins, 5);
    assert.equal(AA.losses, 0);
    assert.equal(AA.ties, 0);
    assert.equal(AA.lossPct, 0);
    assert.equal(AA.winPct, 100);
    assert.equal(AA.ev, 1);

    const sDeuce = results[2];
    assert.equal(sDeuce.hand, '72');
    assert.equal(sDeuce.wins, 0);
    assert.equal(sDeuce.losses, 5);
    assert.equal(sDeuce.ties, 0);
    assert.equal(sDeuce.lossPct, 100);
    assert.equal(sDeuce.winPct, 0);
    assert.equal(sDeuce.ev, 0);
  });
});
