const BC = require('@pascalcoin-sbx/common').BC;
const GUID = require('@pascalcoin-sbx/common').Types.GUID;
const chai = require('chai');

chai.expect();
const expect = chai.expect;

const SAMPLE_GUID = '6865726D-616E-6973-616E-6964696F7421';
const SAMPLE_GUID_NO_HYPHEN = SAMPLE_GUID.replace(new RegExp('-', 'g'), '');
const SAMPLE_GUID_P1 = '6865726D';
const SAMPLE_GUID_P2 = '616E';
const SAMPLE_GUID_P3 = '6973';
const SAMPLE_GUID_P4 = '616E';
const SAMPLE_GUID_P5 = '6964696F7421';

describe('Core.Types.GUID', () => {
  it('can be initialized with a string', () => {
    const g = new GUID(SAMPLE_GUID);

    expect(g.part1.toHex()).to.be.equal(SAMPLE_GUID_P1);
    expect(g.part2.toHex()).to.be.equal(SAMPLE_GUID_P2);
    expect(g.part3.toHex()).to.be.equal(SAMPLE_GUID_P3);
    expect(g.part4.toHex()).to.be.equal(SAMPLE_GUID_P4);
    expect(g.part5.toHex()).to.be.equal(SAMPLE_GUID_P5);
  });
  it('can be initialized with a string without hyphens', () => {
    const g = new GUID(SAMPLE_GUID_NO_HYPHEN);

    expect(g.part1.toHex()).to.be.equal(SAMPLE_GUID_P1);
    expect(g.part2.toHex()).to.be.equal(SAMPLE_GUID_P2);
    expect(g.part3.toHex()).to.be.equal(SAMPLE_GUID_P3);
    expect(g.part4.toHex()).to.be.equal(SAMPLE_GUID_P4);
    expect(g.part5.toHex()).to.be.equal(SAMPLE_GUID_P5);
  });
  it('can be initialized with a BC', () => {
    const g = new GUID(BC.fromHex(SAMPLE_GUID_NO_HYPHEN));

    expect(g.part1.toHex()).to.be.equal(SAMPLE_GUID_P1);
    expect(g.part2.toHex()).to.be.equal(SAMPLE_GUID_P2);
    expect(g.part3.toHex()).to.be.equal(SAMPLE_GUID_P3);
    expect(g.part4.toHex()).to.be.equal(SAMPLE_GUID_P4);
    expect(g.part5.toHex()).to.be.equal(SAMPLE_GUID_P5);
  });

  it('can be initialized from an existing guid', () => {
    const g1 = new GUID(SAMPLE_GUID);
    const g2 = new GUID(g1);
    expect(g1.part1.toHex()).to.be.equal(g2.part1.toHex());
    expect(g1.part2.toHex()).to.be.equal(g2.part2.toHex());
    expect(g1.part3.toHex()).to.be.equal(g2.part3.toHex());
    expect(g1.part4.toHex()).to.be.equal(g2.part4.toHex());
    expect(g1.part5.toHex()).to.be.equal(g2.part5.toHex());
  });

  it('will fail in case of an invalid guid', () => {
    expect(() => new Guid('ABC')).to.throw();
    expect(() => new Guid('ABCDEFGHIJKLMNOPQ')).to.throw();
  });

  it('can be formatted', () => {
    const g1 = new GUID(SAMPLE_GUID);
    expect(g1.toString()).to.be.equal(SAMPLE_GUID);
  });

  it('can be generated', () => {
    const g1 = GUID.generate();
    expect(g1.toString()).to.be.equal(g1.toString());
  });

  it('can will throw an error if some parts are not in the current length', () => {
    expect(() => {
      new GUID(`0-${SAMPLE_GUID_P2}-${SAMPLE_GUID_P3}-${SAMPLE_GUID_P4}-${SAMPLE_GUID_P5}`);
    }).to.throw();
    expect(() => {
      new GUID(`00-${SAMPLE_GUID_P2}-${SAMPLE_GUID_P3}-${SAMPLE_GUID_P4}-${SAMPLE_GUID_P5}`);
    }).to.throw();
    expect(() => {
      new GUID(`000000000-${SAMPLE_GUID_P2}-${SAMPLE_GUID_P3}-${SAMPLE_GUID_P4}-${SAMPLE_GUID_P5}`);
    }).to.throw();
    expect(() => {
      new GUID(`0000000000-${SAMPLE_GUID_P2}-${SAMPLE_GUID_P3}-${SAMPLE_GUID_P4}-${SAMPLE_GUID_P5}`);
    }).to.throw();
    expect(() => {
      new GUID(`${SAMPLE_GUID_P1}-0-${SAMPLE_GUID_P3}-${SAMPLE_GUID_P4}-${SAMPLE_GUID_P5}`);
    }).to.throw();
    expect(() => {
      new GUID(`${SAMPLE_GUID_P1}-00-${SAMPLE_GUID_P3}-${SAMPLE_GUID_P4}-${SAMPLE_GUID_P5}`);
    }).to.throw();
    expect(() => {
      new GUID(`${SAMPLE_GUID_P1}-00000-${SAMPLE_GUID_P3}-${SAMPLE_GUID_P4}-${SAMPLE_GUID_P5}`);
    }).to.throw();
    expect(() => {
      new GUID(`${SAMPLE_GUID_P1}-000000-${SAMPLE_GUID_P3}-${SAMPLE_GUID_P4}-${SAMPLE_GUID_P5}`);
    }).to.throw();
    expect(() => {
      new GUID(`${SAMPLE_GUID_P1}-${SAMPLE_GUID_P2}-0-${SAMPLE_GUID_P4}-${SAMPLE_GUID_P5}`);
    }).to.throw();
    expect(() => {
      new GUID(`${SAMPLE_GUID_P1}-${SAMPLE_GUID_P2}-00-${SAMPLE_GUID_P4}-${SAMPLE_GUID_P5}`);
    }).to.throw();
    expect(() => {
      new GUID(`${SAMPLE_GUID_P1}-${SAMPLE_GUID_P2}-00000-${SAMPLE_GUID_P4}-${SAMPLE_GUID_P5}`);
    }).to.throw();
    expect(() => {
      new GUID(`${SAMPLE_GUID_P1}-${SAMPLE_GUID_P2}-000000-${SAMPLE_GUID_P4}-${SAMPLE_GUID_P5}`);
    }).to.throw();
    expect(() => {
      new GUID(`${SAMPLE_GUID_P1}-${SAMPLE_GUID_P2}-${SAMPLE_GUID_P3}-0-${SAMPLE_GUID_P5}`);
    }).to.throw();
    expect(() => {
      new GUID(`${SAMPLE_GUID_P1}-${SAMPLE_GUID_P2}-${SAMPLE_GUID_P3}-00-${SAMPLE_GUID_P5}`);
    }).to.throw();
    expect(() => {
      new GUID(`${SAMPLE_GUID_P1}-${SAMPLE_GUID_P2}-${SAMPLE_GUID_P3}-00000-${SAMPLE_GUID_P5}`);
    }).to.throw();
    expect(() => {
      new GUID(`${SAMPLE_GUID_P1}-${SAMPLE_GUID_P2}-${SAMPLE_GUID_P3}-000000-${SAMPLE_GUID_P5}`);
    }).to.throw();
    expect(() => {
      new GUID(`${SAMPLE_GUID_P1}-${SAMPLE_GUID_P2}-${SAMPLE_GUID_P3}-${SAMPLE_GUID_P4}-0`);
    }).to.throw();
    expect(() => {
      new GUID(`${SAMPLE_GUID_P1}-${SAMPLE_GUID_P2}-${SAMPLE_GUID_P3}-${SAMPLE_GUID_P4}-00`);
    }).to.throw();
    expect(() => {
      new GUID(`${SAMPLE_GUID_P1}-${SAMPLE_GUID_P2}-${SAMPLE_GUID_P3}-${SAMPLE_GUID_P4}-0000000000000`);
    }).to.throw();
    expect(() => {
      new GUID(`${SAMPLE_GUID_P1}-${SAMPLE_GUID_P2}-${SAMPLE_GUID_P3}-${SAMPLE_GUID_P4}-00000000000000`);
    }).to.throw();
  });

  it('can combine everything to a BC instance', () => {
    expect(new GUID(SAMPLE_GUID).toBC().toHex()).to.be.equal(SAMPLE_GUID_NO_HYPHEN);
  });
});
