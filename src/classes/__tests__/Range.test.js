import Range from '../Range';


describe('Range', () => {
  it('generates defined hand', () => {
    const range = new Range('Ah2d');
    const expectedHands = [
      ['Ah', '2d']
    ];
    assert.equal(range.hands.length, 1);
    assertArrayEqual(range.hands, expectedHands);
    expectedHands.forEach(() => {
      assertDeepInclude(expectedHands, range.get());
    });
  });

  it('generates suited hand', () => {
    const range = new Range('AQs');
    const expectedHands = [
      ['Ac', 'Qc'],
      ['Ad', 'Qd'],
      ['Ah', 'Qh'],
      ['As', 'Qs'],
    ];
    assert.equal(range.hands.length, 4);
    assertArrayEqual(range.hands, expectedHands);
    expectedHands.forEach(() => {
      assertDeepInclude(expectedHands, range.get());
    });
  });

  it('generates offsuit hand', () => {
    const range = new Range('93o');
    let expectedHands = [
      ['9c', '3d'],
      ['9c', '3h'],
      ['9c', '3s'],
      ['9h', '3c'],
      ['9h', '3d'],
      ['9h', '3s'],
      ['9d', '3c'],
      ['9d', '3h'],
      ['9d', '3s'],
      ['9s', '3c'],
      ['9s', '3d'],
      ['9s', '3h'],
    ];
    assert.equal(range.hands.length, 12);
    assertArrayEqual(range.hands, expectedHands);
    expectedHands.forEach(() => {
      assertDeepInclude(expectedHands, range.get());
    });
  });

  it('generates pocket pair hand', () => {
    const range = new Range('55');
    let expectedHands = [
      ['5c', '5d'],
      ['5c', '5h'],
      ['5c', '5s'],
      ['5d', '5h'],
      ['5d', '5s'],
      ['5h', '5s'],
    ];
    assert.equal(range.hands.length, 6);
    assertArrayEqual(range.hands, expectedHands);
    expectedHands.forEach(() => {
      assertDeepInclude(expectedHands, range.get());
    });
  });

  it('generates rank-only hand', () => {
    const range = new Range('AQ');
    let expectedHands = [
      ['Ac', 'Qc'],
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
      ['As', 'Qs'],
    ];
    assert.equal(range.hands.length, 16);
    assertArrayEqual(range.hands, expectedHands);
    expectedHands.forEach(() => {
      assertDeepInclude(expectedHands, range.get());
    });
  });

  it('merges multiple ranges', () => {
    const range = new Range('AQ, 93o, 55');
    let expectedHands = [
      ['Ac', 'Qc'],
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
      ['As', 'Qs'],
      ['9c', '3d'],
      ['9c', '3h'],
      ['9c', '3s'],
      ['9h', '3c'],
      ['9h', '3d'],
      ['9h', '3s'],
      ['9d', '3c'],
      ['9d', '3h'],
      ['9d', '3s'],
      ['9s', '3c'],
      ['9s', '3d'],
      ['9s', '3h'],
      ['5c', '5d'],
      ['5c', '5h'],
      ['5c', '5s'],
      ['5d', '5h'],
      ['5d', '5s'],
      ['5h', '5s'],
    ];
    assert.equal(range.hands.length, 34);
    assertArrayEqual(range.hands, expectedHands);
    expectedHands.forEach(() => {
      assertDeepInclude(expectedHands, range.get());
    });
  });

  it('toString', () => {
    assert.equal(new Range('5h2d'), '5h2d');
    assert.equal(new Range('AQs'), 'AQs');
    assert.equal(new Range('AQ'), 'AQ');
  });
});