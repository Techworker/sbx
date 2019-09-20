const chai = require('chai');
const Endian = require('@pascalcoin-sbx/common').Endian;

chai.expect();
const expect = chai.expect;

describe('Common.Endian', () => {
  it('will return the correct shortcuts', () => {
    expect(Endian.LITTLE_ENDIAN).to.be.equal('LE');
    expect(Endian.BIG_ENDIAN).to.be.equal('BE');
  });
});
