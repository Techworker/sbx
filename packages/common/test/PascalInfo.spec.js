const chai = require('chai');
const PascalInfo = require('@pascalcoin-sbx/common').PascalInfo;

chai.expect();
const expect = chai.expect;

describe('Common.PascalInfo', () => {
  it('can return the min fee', () => {
    expect(PascalInfo.MIN_FEE().toMolina()).to.be.equal('1');
  });
  it('returns the may payload length', () => {
    expect(PascalInfo.MAX_PAYLOAD_LENGTH).to.be.equal(255);
  });
  it('returns the block activation for PIP 10', () => {
    expect(PascalInfo.PIP_0010).to.be.equal(210240);
    expect(PascalInfo.INFLATION_REDUCTION).to.be.equal(210240);
  });
  it('returns the block activation for PIP 9', () => {
    expect(PascalInfo.PIP_0009).to.be.equal(260000);
    expect(PascalInfo.RANDOM_HASH).to.be.equal(260000);
  });
  it('returns the block activation for PIP 11', () => {
    expect(PascalInfo.PIP_0011).to.be.equal(210000);
    expect(PascalInfo.DEVELOPER_REWARD).to.be.equal(210000);
  });
  it('can detect PIP 10', () => {
    expect(PascalInfo.isInflationReduction(210239)).to.be.equal(false);
    expect(PascalInfo.isInflationReduction(210240)).to.be.equal(true);
    expect(PascalInfo.isInflationReduction(210241)).to.be.equal(true);
  });
  it('can detect PIP 9', () => {
    expect(PascalInfo.isRandomHash(259999)).to.be.equal(false);
    expect(PascalInfo.isRandomHash(260000)).to.be.equal(true);
    expect(PascalInfo.isRandomHash(260001)).to.be.equal(true);
  });
  it('can detect PIP 11', () => {
    expect(PascalInfo.isDeveloperReward(209999)).to.be.equal(false);
    expect(PascalInfo.isDeveloperReward(210000)).to.be.equal(true);
    expect(PascalInfo.isDeveloperReward(210001)).to.be.equal(true);
  });
});
