'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _Range = require('../Range');

var _Range2 = _interopRequireDefault(_Range);

var _Simulator = require('../Simulator');

var _Simulator2 = _interopRequireDefault(_Simulator);

describe('Simulator.constructor', function () {
  it('sets this.ranges', function () {
    var sim = new _Simulator2['default'](['AhAd', 'KhKd', '5s3c'], []);
    assert.equal(sim.ranges.length, 3);

    sim.ranges.forEach(function (hand) {
      assert.equal(hand.constructor, _Range2['default']);
    });

    assert.deepEqual(sim.ranges[0].get(), ['Ah', 'Ad']);
    assert.deepEqual(sim.ranges[1].get(), ['Kh', 'Kd']);
    assert.deepEqual(sim.ranges[2].get(), ['5s', '3c']);
  });

  it('sets this.board', function () {
    var sim = new _Simulator2['default'](['AA', 'QTs'], ['Kd', '9h', '2s']);
    assert.equal(sim.board.length, 3);
    assert.deepEqual(sim.board, ['Kd', '9h', '2s']);
  });

  it('sets this.results', function () {
    var sim = new _Simulator2['default'](['AA', 'QTs'], ['Kd', '9h', '2s']);
    assert.equal(sim.results.length, 2);
  });
});

describe('Simulator.run', function () {
  it('sets results', function () {
    var sim = new _Simulator2['default'](['AA', 'JJ', '72'], ['Kc', 'Kd', 'Kh', 'Ks', 'Qc']);
    sim.run(5);

    assert.equal(sim.runs, 5);

    assert.equal(sim.results[0].range, 'AA');
    assert.equal(sim.results[0].wins, 5);

    assert.equal(sim.results[1].range, 'JJ');
    assert.equal(sim.results[1].wins, 0);

    assert.equal(sim.results[2].range, '72');
    assert.equal(sim.results[2].wins, 0);
  });

  it('is somewhat accurate (AA vs KK)', function () {
    var sim = new _Simulator2['default'](['AA', 'KK']);
    var results = sim.run(1000);

    assert.equal(results[0].range, 'AA');
    assert.isAbove(results[0].wins, 750);
    assert.isBelow(results[0].losses, 250);
    assert.isBelow(results[0].ties, 50);
    assert.isBelow(results[0].lossPct, 25);
    assert.isAbove(results[0].winPct, 75);
    assert.isAbove(results[0].ev, .75);

    assert.equal(results[1].range, 'KK');
    assert.isBelow(results[1].wins, 250);
    assert.isAbove(results[1].losses, 750);
    assert.isBelow(results[1].ties, 50);
    assert.isAbove(results[1].lossPct, 75);
    assert.isBelow(results[1].winPct, 25);
    assert.isBelow(results[1].ev, .25);
  });
});

describe('Simulator.getResults', function () {
  it('aggregates results', function () {
    var sim = new _Simulator2['default'](['AA', 'JJ', '72'], ['Kc', 'Kd', 'Kh', 'Ks', 'Qc']);
    var results = sim.run(5);

    var AA = results[0];
    assert.equal(AA.range, 'AA');
    assert.equal(AA.wins, 5);
    assert.equal(AA.losses, 0);
    assert.equal(AA.ties, 0);
    assert.equal(AA.lossPct, 0);
    assert.equal(AA.winPct, 100);
    assert.equal(AA.ev, 1);

    var sDeuce = results[2];
    assert.equal(sDeuce.range, '72');
    assert.equal(sDeuce.wins, 0);
    assert.equal(sDeuce.losses, 5);
    assert.equal(sDeuce.ties, 0);
    assert.equal(sDeuce.lossPct, 100);
    assert.equal(sDeuce.winPct, 0);
    assert.equal(sDeuce.ev, 0);
  });
});