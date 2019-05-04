const Currency = require('@pascalcoin-sbx/common').Types.Currency;

const chai = require('chai');

chai.expect();
const expect = chai.expect;

describe('Core.Types.Currency', () => {
  it('can be created from various types', () => {
    let c = new Currency(1);

    expect(c.toStringOpt()).to.be.equal('1');

    c = new Currency(1.1);
    expect(c.toStringOpt()).to.be.equal('1.1');

    c = new Currency(1.1110);
    expect(c.toStringOpt()).to.be.equal('1.111');

    c = new Currency('1.1110');
    expect(c.toStringOpt()).to.be.equal('1.111');
  });

  it('can add', () => {
    let c1 = new Currency('1.1');
    let c2 = new Currency('1.2');

    expect(c1.add(c2).toStringOpt()).to.be.equal('2.3');
  });

  it('can sub', () => {
    let c1 = new Currency('1.2');
    let c2 = new Currency('1.1');

    expect(c1.sub(c2).toStringOpt()).to.be.equal('0.1');
  });

  it('can output a fixed decimal', () => {
    let c1 = new Currency('1.2');

    expect(c1.toString()).to.be.equal('1.2000');
  });
  it('can output a optimized decimal', () => {
    let c1 = new Currency('1.2000');

    expect(c1.toStringOpt()).to.be.equal('1.2');
  });
  it('can output molina', () => {
    let c1 = new Currency('1.2000');

    expect(c1.toMolina()).to.be.equal("12000");
  });
  it('can handle negatives', () => {
    let c1 = new Currency('-1.2000');

    expect(c1.toMolina()).to.be.equal("-12000");
  });
  it('can make a negative value positive', () => {
    let c1 = new Currency('-1.2000');

    expect(c1.toPositive().toMolina()).to.be.equal("12000");
  });

  it('skips when a positive value should be converted to positive', () => {
    let c1 = new Currency('1.2000');

    expect(c1.toPositive().toMolina()).to.be.equal("12000");
  });

  it('can compare values if they are equal', () => {
    let c1 = new Currency('1.2000');
    let c2 = new Currency('1.2000');
    let c3 = new Currency('1.3000');
    let c4 = new Currency('-1.2000');

    expect(c1.eq(c2)).to.be.equal(true);
    expect(c1.eq(c3)).to.be.equal(false);
    expect(c1.eq(c4)).to.be.equal(false);
  });

  it('can compare values if they are lower', () => {
    let c1 = new Currency('1.2000');
    let c2 = new Currency('1.2000');
    let c3 = new Currency('1.3000');
    let c4 = new Currency('-1.2000');

    expect(c1.lt(c2)).to.be.equal(false);
    expect(c1.lt(c3)).to.be.equal(true);
    expect(c1.lt(c4)).to.be.equal(false);
  });

  it('can compare values if they are greater', () => {
    let c1 = new Currency('1.2000');
    let c2 = new Currency('1.2000');
    let c3 = new Currency('1.3000');
    let c4 = new Currency('-1.2000');

    expect(c1.gt(c2)).to.be.equal(false);
    expect(c1.gt(c3)).to.be.equal(false);
    expect(c1.gt(c4)).to.be.equal(true);
  });

  it('can compare values if they are greater or equal', () => {
    let c1 = new Currency('1.2000');
    let c2 = new Currency('1.2000');
    let c3 = new Currency('1.3000');
    let c4 = new Currency('-1.2000');

    expect(c1.gteq(c2)).to.be.equal(true);
    expect(c1.gteq(c3)).to.be.equal(false);
    expect(c1.gteq(c4)).to.be.equal(true);
  });

  it('can compare values if they are lower or equal', () => {
    let c1 = new Currency('1.2000');
    let c2 = new Currency('1.2000');
    let c3 = new Currency('1.3000');
    let c4 = new Currency('-1.2000');

    expect(c1.lteq(c2)).to.be.equal(true);
    expect(c1.lteq(c3)).to.be.equal(true);
    expect(c1.lteq(c4)).to.be.equal(false);
  });

  it('can serialize a currency', () => {
    let c1 = new Currency('1.2000').serialize();

    expect(c1.molina).to.be.equal("12000");
    expect(c1.pascal).to.be.equal('1.2');
  });
});
