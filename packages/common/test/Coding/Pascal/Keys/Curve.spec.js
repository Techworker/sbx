const BC = require('@pascalcoin-sbx/common').BC;
const CurveCoder = require('@pascalcoin-sbx/common').Coding.Pascal.Keys.Curve;
const Curve = require('@pascalcoin-sbx/common').Types.Keys.Curve;
const chai = require('chai');
const expect = chai.expect;

describe('Coding.Pascal.Keys.Curve', () => {
  it('can encode a pascalcoin key curve', () => {
    expect(new CurveCoder('curve').encodeToBytes(new Curve(Curve.CN_SECP256K1)).toHex()).to.be.equal('CA02');
  });
  it('can decode a pascalcoin key curve', () => {
    expect(new CurveCoder('curve').decodeFromBytes(BC.from('CA02'))).to.be.instanceOf(Curve);
    expect(new CurveCoder('curve').decodeFromBytes(BC.from('CA02')).id).to.be.equal(Curve.CI_SECP256K1);
  });
});
