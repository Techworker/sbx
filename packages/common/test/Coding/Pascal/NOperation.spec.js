const BC = require('@pascalcoin-sbx/common').BC;
const NOPerationCoder = require('@pascalcoin-sbx/common').Coding.Pascal.NOperation;
const chai = require('chai');
const expect = chai.expect;

describe('Coding.Pascal.NOperation', () => {
  it('can encode a pascalcoin NOperation', () => {
    expect(new NOPerationCoder('test').encodeToBytes(9).toHex()).to.be.equal('09000000');
  });
  it('can decode a pascalcoin NOperation', () => {
    expect(new NOPerationCoder('test').decodeFromBytes(BC.from('09000000'))).to.be.equal(9);
  });
  it('will assign a default id', () => {
    expect(new NOPerationCoder().id).to.be.equal('nOperation');
  });
});
