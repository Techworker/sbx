const BC = require('@pascalcoin-sbx/common').BC;
const AbstractType = require('@pascalcoin-sbx/common').Coding.AbstractType;
const Decissive = require('@pascalcoin-sbx/common').Coding.Decissive;
const CompositeType = require('@pascalcoin-sbx/common').Coding.CompositeType;
const StringWOL = require('@pascalcoin-sbx/common').Coding.Core.StringWithoutLength;
const Int8 = require('@pascalcoin-sbx/common').Coding.Core.Int8;
const Int16 = require('@pascalcoin-sbx/common').Coding.Core.Int16;
const chai = require('chai');
const expect = chai.expect;

describe('Coding.CompositeType', () => {
  it('can add subtypes', () => {

    const ct = new CompositeType();
    const st = new StringWOL('a');

    ct.addSubType(st);

    expect(ct.subTypes[0]).to.be.equal(st);
  });

  it('returns the flatten value', () => {

    const ct = new CompositeType('test', true);

    expect(ct.flatten).to.be.equal(true);
    const ct2 = new CompositeType('test', false);

    expect(ct2.flatten).to.be.equal(false);
  });

  it('can encode multiple subtypes', () => {
    const ct = new CompositeType('test');

    ct.addSubType(new Int8('sub1', true));
    ct.addSubType(new Int8('sub2', true));

    expect(ct.encodeToBytes({sub1: 1, sub2: 2}).toHex()).to.be.equal('0102');
  });

  it('skips undeterminable empty subtypes (eg. from decissive)', () => {
    const ct = new CompositeType('test');

    ct.addSubType(new Int8('sub1', true));
    ct.addSubType(null);
    ct.addSubType(new Int8('sub2', true));

    expect(ct.encodeToBytes({sub1: 1, sub2: 2}).toHex()).to.be.equal('0102');
  });

  it('flattens decissive values', () => {
    const ct = new CompositeType('test', false);

    ct.addSubType(new Int8('test_v1', true));
    ct.addSubType(new Decissive('test_v', 'test_v', (markerValue) => {
      switch (markerValue) {
        case 1:
          const c = new CompositeType('test_v');

          c.addSubType(new Int8('test_v'));
          return c;
        case 2:
          const c2 = new CompositeType('test_v');

          c2.addSubType(new Int16('test_v'));
          return c2;
      }
    }, true));
    ct.addSubType(new Int8('test_v3', true));

    expect(ct.encodeToBytes({
      test_v1: 1,
      test_v: 1,
      test_v3: 3
    }).toHex()).to.be.equal('010103');
    expect(ct.encodeToBytes({test_v1: 1, test_v: 2, test_v3: 3}).toHex()).to.be.equal('01020003');
  });

  it('can decode a composite type', () => {
    const ct = new CompositeType('ct');
    ct.addSubType(new Int8('test_v1', true));
    ct.addSubType(new Int16('test_v2', true));

    expect(ct.decodeFromBytes(BC.fromHex('010200'))).to.be.eql({test_v1: 1, test_v2: 2});
  });
});
