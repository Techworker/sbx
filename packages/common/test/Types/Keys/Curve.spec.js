const Curve = require('@pascalcoin-sbx/common').Types.Keys.Curve;
const elliptic = require('elliptic');

const chai = require('chai');

chai.expect();
const expect = chai.expect;

describe('Core.Types.Keys.Curve', () => {
  it('can be created from a number', () => {
    let c = new Curve(714); // secp256k1

    expect(c.id).to.be.equal(714);
    expect(c.name).to.be.equal('secp256k1');

    c = new Curve(715); // p384
    expect(c.id).to.be.equal(715);
    expect(c.name).to.be.equal('p384');

    c = new Curve(716); // p384
    expect(c.id).to.be.equal(716);
    expect(c.name).to.be.equal('p521');

    c = new Curve(729); // p384
    expect(c.id).to.be.equal(729);
    expect(c.name).to.be.equal('sect283k1');
  });
  it('can be created from a name', () => {
    let c = new Curve('secp256k1'); //

    expect(c.id).to.be.equal(714);
    expect(c.name).to.be.equal('secp256k1');

    c = new Curve('p384');
    expect(c.id).to.be.equal(715);
    expect(c.name).to.be.equal('p384');

    c = new Curve('p521');
    expect(c.id).to.be.equal(716);
    expect(c.name).to.be.equal('p521');

    c = new Curve('sect283k1');
    expect(c.id).to.be.equal(729);
    expect(c.name).to.be.equal('sect283k1');
  });
  it('will return false for sect283k1 supported', () => {
    expect(new Curve(Curve.CI_SECT283K1).supported).to.equal(false);
    expect(new Curve(Curve.CI_SECP256K1).supported).to.equal(true);
    expect(new Curve(Curve.CI_P384).supported).to.equal(true);
    expect(new Curve(Curve.CI_P521).supported).to.equal(true);
  });
  it('will throw an error with unknown curve', () => {
    expect(() => new Curve('abc')).to.throw();
    expect(() => new Curve(100101)).to.throw();
  });
  it('will return the name on toString()', () => {
    let c = new Curve('p521');

    expect(c.toString()).to.be.equal('p521');
  });
  it('will return secp256k1 as default curve()', () => {
    let c = Curve.getDefaultCurve();

    expect(c.id).to.be.equal(714);
    expect(c.name).to.be.equal('secp256k1');
  });
  it('provides constants to access the name in a controlled manner', () => {
    expect(Curve.CN_SECP256K1).to.be.equal('secp256k1');
    expect(Curve.CN_P384).to.be.equal('p384');
    expect(Curve.CN_SECT283K1).to.be.equal('sect283k1');
    expect(Curve.CN_P521).to.be.equal('p521');
  });
});
