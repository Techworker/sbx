const OperationHash = require('@pascalcoin-sbx/common').Types.OperationHash;
const BC = require('@pascalcoin-sbx/common').BC;

const chai = require('chai');

chai.expect();
const expect = chai.expect;

describe('Core.Types.OperationHash', () => {
  it('can be created manually and returns correct initialization values', () => {
    const oph = new OperationHash(1, 2, 3, BC.fromHex('AA'.repeat(20)));

    expect(oph.block).to.be.equal(1);
    expect(oph.account.account).to.be.equal(2);
    expect(oph.nOperation).to.be.equal(3);
    expect(oph.md160.toHex()).to.be.equal('AA'.repeat(20));
  });

  it('checks a valid md160', () => {
    expect(() => new OperationHash(1, 2, 3, BC.fromHex('AA'.repeat(10)))).to.throw();
  });
});
