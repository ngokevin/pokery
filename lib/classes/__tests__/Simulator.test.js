'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _HoleCards = require('../HoleCards');

var _HoleCards2 = _interopRequireDefault(_HoleCards);

var _Simulator = require('../Simulator');

var _Simulator2 = _interopRequireDefault(_Simulator);

describe('Simulator.constructor', function () {
  it('sets this.hands', function () {
    var sim = new _Simulator2['default'](['AhAd', 'KhKd', '5s3c'], []);
    assert.equal(sim.hands.length, 3);

    sim.hands.forEach(function (hand) {
      assert.equal(hand.constructor, _HoleCards2['default']);
    });

    assert.deepEqual(sim.hands[0].get(), ['Ah', 'Ad']);
    assert.deepEqual(sim.hands[1].get(), ['Kh', 'Kd']);
    assert.deepEqual(sim.hands[2].get(), ['5s', '3c']);
  });

  it('sets this.board', function () {
    var sim = new _Simulator2['default'](['AA', 'QTs'], ['Kd', '9h', '2s']);
    assert.equal(sim.board.length, 3);
    assert.deepEqual(sim.board, ['Kd', '9h', '2s']);
  });

  it('sets this.result', function () {
    var sim = new _Simulator2['default'](['AA', 'QTs'], ['Kd', '9h', '2s']);
    assert.equal(sim.results.length, 2);
  });
});

describe('Simulator.run', function () {
  it('sets results', function () {
    var sim = new _Simulator2['default'](['AA', 'JJ', '72'], ['Kc', 'Kd', 'Kh', 'Ks', 'Qc']);
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

describe('Simulator.getResults', function () {
  it('aggregates results', function () {
    var sim = new _Simulator2['default'](['AA', 'JJ', '72'], ['Kc', 'Kd', 'Kh', 'Ks', 'Qc']);
    sim.run(5);
    var results = sim.getResults();

    var AA = results[0];
    assert.equal(AA.hand, 'AA');
    assert.equal(AA.wins, 5);
    assert.equal(AA.losses, 0);
    assert.equal(AA.ties, 0);
    assert.equal(AA.lossPct, 0);
    assert.equal(AA.winPct, 100);
    assert.equal(AA.ev, 1);

    var sDeuce = results[2];
    assert.equal(sDeuce.hand, '72');
    assert.equal(sDeuce.wins, 0);
    assert.equal(sDeuce.losses, 5);
    assert.equal(sDeuce.ties, 0);
    assert.equal(sDeuce.lossPct, 100);
    assert.equal(sDeuce.winPct, 0);
    assert.equal(sDeuce.ev, 0);
  });
});