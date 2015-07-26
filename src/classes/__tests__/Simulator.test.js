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

    assert.equal(sim.results[0].hand, 'AA');
    assert.equal(sim.results[0].wins, 5);

    assert.equal(sim.results[1].hand, 'JJ');
    assert.equal(sim.results[1].wins, 0);

    assert.equal(sim.results[2].hand, '72');
    assert.equal(sim.results[2].wins, 0);
  });
});
