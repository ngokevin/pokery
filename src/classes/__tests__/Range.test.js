import Range from '../Range';


describe('Range.constructor', () => {
  it('generates defined hands', () => {
    const range = new Range('Ah2d');
    const expectedHands = [
      ['Ah', '2d']
    ];
    assert.equal(range.hands.length, 1);
    assertArrayEqual(range.hands, expectedHands);
  });

  it('generates rank only hands', () => {
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
  });

  it('generates rank only plus hands', () => {
    let range = new Range('AJ+');
    let expectedHands = [
      ['Ac', 'Jc'],
      ['Ac', 'Jd'],
      ['Ac', 'Jh'],
      ['Ac', 'Js'],
      ['Ah', 'Jc'],
      ['Ah', 'Jd'],
      ['Ah', 'Jh'],
      ['Ah', 'Js'],
      ['Ad', 'Jc'],
      ['Ad', 'Jd'],
      ['Ad', 'Jh'],
      ['Ad', 'Js'],
      ['As', 'Jc'],
      ['As', 'Jd'],
      ['As', 'Jh'],
      ['As', 'Js'],
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
      ['Ac', 'Kc'],
      ['Ac', 'Kd'],
      ['Ac', 'Kh'],
      ['Ac', 'Ks'],
      ['Ah', 'Kc'],
      ['Ah', 'Kd'],
      ['Ah', 'Kh'],
      ['Ah', 'Ks'],
      ['Ad', 'Kc'],
      ['Ad', 'Kd'],
      ['Ad', 'Kh'],
      ['Ad', 'Ks'],
      ['As', 'Kc'],
      ['As', 'Kd'],
      ['As', 'Kh'],
      ['As', 'Ks'],
    ];
    assert.equal(range.hands.length, 48);
    assertArrayEqual(range.hands, expectedHands);

    // Reverse.
    let reverseRange = new Range('JA+');
    assertArrayEqual(reverseRange.hands, range.hands);
  });

  it('generates offsuit hands', () => {
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
  });

  it('generates offsuited plus hands', () => {
    let range = new Range('AJo+');
    let expectedHands = [
      ['Ac', 'Jd'],
      ['Ac', 'Jh'],
      ['Ac', 'Js'],
      ['Ah', 'Jc'],
      ['Ah', 'Jd'],
      ['Ah', 'Js'],
      ['Ad', 'Jc'],
      ['Ad', 'Jh'],
      ['Ad', 'Js'],
      ['As', 'Jc'],
      ['As', 'Jd'],
      ['As', 'Jh'],
      ['Ac', 'Qd'],
      ['Ac', 'Qh'],
      ['Ac', 'Qs'],
      ['Ah', 'Qc'],
      ['Ah', 'Qd'],
      ['Ah', 'Qs'],
      ['Ad', 'Qc'],
      ['Ad', 'Qh'],
      ['Ad', 'Qs'],
      ['As', 'Qc'],
      ['As', 'Qd'],
      ['As', 'Qh'],
      ['Ac', 'Kd'],
      ['Ac', 'Kh'],
      ['Ac', 'Ks'],
      ['Ah', 'Kc'],
      ['Ah', 'Kd'],
      ['Ah', 'Ks'],
      ['Ad', 'Kc'],
      ['Ad', 'Kh'],
      ['Ad', 'Ks'],
      ['As', 'Kc'],
      ['As', 'Kd'],
      ['As', 'Kh'],
    ];
    assert.equal(range.hands.length, 36);
    assertArrayEqual(range.hands, expectedHands);

    // Reverse.
    let reverseRange = new Range('JAo+');
    assertArrayEqual(range.hands, reverseRange.hands);

    // Move around plus-sign.
    let movedPlusSignRange = new Range('AJ+o');
    assertArrayEqual(range.hands, movedPlusSignRange.hands);
  });

  it('generates suited hands', () => {
    const range = new Range('AQs');
    const expectedHands = [
      ['Ac', 'Qc'],
      ['Ad', 'Qd'],
      ['Ah', 'Qh'],
      ['As', 'Qs'],
    ];
    assert.equal(range.hands.length, 4);
    assertArrayEqual(range.hands, expectedHands);
  });

  it('generates suited plus hands', () => {
    let range = new Range('AJs+');
    let expectedHands = [
      ['Ac', 'Jc'],
      ['Ah', 'Jh'],
      ['Ad', 'Jd'],
      ['As', 'Js'],
      ['Ac', 'Qc'],
      ['Ah', 'Qh'],
      ['Ad', 'Qd'],
      ['As', 'Qs'],
      ['Ac', 'Kc'],
      ['Ah', 'Kh'],
      ['Ad', 'Kd'],
      ['As', 'Ks'],
    ];
    assert.equal(range.hands.length, 12);
    assertArrayEqual(range.hands, expectedHands);

    // Reverse.
    let reverseRange = new Range('JAs+');
    assertArrayEqual(range.hands, reverseRange.hands);

    // Move around plus-sign.
    let movedPlusSignRange = new Range('AJ+s');
    assertArrayEqual(range.hands, movedPlusSignRange.hands);
  });

  it('generates pocket pair hands', () => {
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
  });

  it('generates pocket pair range hands', () => {
    let range = new Range('55-88');
    let expectedHands = [
      ['5c', '5d'],
      ['5c', '5h'],
      ['5c', '5s'],
      ['5d', '5h'],
      ['5d', '5s'],
      ['5h', '5s'],
      ['6c', '6d'],
      ['6c', '6h'],
      ['6c', '6s'],
      ['6d', '6h'],
      ['6d', '6s'],
      ['6h', '6s'],
      ['7c', '7d'],
      ['7c', '7h'],
      ['7c', '7s'],
      ['7d', '7h'],
      ['7d', '7s'],
      ['7h', '7s'],
      ['8c', '8d'],
      ['8c', '8h'],
      ['8c', '8s'],
      ['8d', '8h'],
      ['8d', '8s'],
      ['8h', '8s'],
    ];
    assert.equal(range.hands.length, 24);
    assertArrayEqual(range.hands, expectedHands);

    // Reverse.
    let reverseRange = new Range('88-55');
    assertArrayEqual(reverseRange.hands, range.hands);
  });

  it('generates pocket pair plus hands', () => {
    const range = new Range('QQ+');
    let expectedHands = [
      ['Qc', 'Qd'],
      ['Qc', 'Qh'],
      ['Qc', 'Qs'],
      ['Qd', 'Qh'],
      ['Qd', 'Qs'],
      ['Qh', 'Qs'],
      ['Kc', 'Kd'],
      ['Kc', 'Kh'],
      ['Kc', 'Ks'],
      ['Kd', 'Kh'],
      ['Kd', 'Ks'],
      ['Kh', 'Ks'],
      ['Ac', 'Ad'],
      ['Ac', 'Ah'],
      ['Ac', 'As'],
      ['Ad', 'Ah'],
      ['Ad', 'As'],
      ['Ah', 'As'],
    ];
    assert.equal(range.hands.length, 18);
    assertArrayEqual(range.hands, expectedHands);
  });

  it('concatenates multiple ranges', () => {
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
  });
});


describe('Range.get', () => {
  it('returns random hand from range', () => {
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
    for (var i = 0; i < expectedHands.length; i++) {
      assertDeepInclude(expectedHands, range.get());
    }
  });

  it('factors in dead cards', () => {
    const range = new Range('QQ');
    const expectedHands = [
      ['Qc', 'Qd'],
      ['Qc', 'Qh'],
      ['Qd', 'Qh']
    ];
    for (var i = 0; i < 6; i++) {
      assertDeepInclude(expectedHands, range.get(['Qs']));
    }
  });

  it('returns -1 if empty range', () => {
    const range = new Range('TT');
    for (var i = 0; i < 6; i++) {
      assert.equal(-1, range.get(['Ts', 'Td', 'Tc']));
    }
  });
});


describe('Range.toString', () => {
  it('returns original argument', () => {
    assert.equal(new Range('5h2d'), '5h2d');
    assert.equal(new Range('AQs'), 'AQs');
    assert.equal(new Range('AQ'), 'AQ');
    assert.equal(new Range('AK+,TT+'), 'AK+,TT+');
  });
});
