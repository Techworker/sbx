const BC = require('@pascalcoin-sbx/common').BC;
const BytesFixedLength = require('@pascalcoin-sbx/common').Coding.Core.BytesFixedLength;
const chai = require('chai');
const expect = chai.expect;

describe('Coding.Core.BytesFixedLength', () => {
  it('will encode up to length', () => {
    expect(new BytesFixedLength('test', 1).encodeToBytes(BC.from('74657374')).toHex()).to.be.equal('74');
    expect(new BytesFixedLength('test', 2).encodeToBytes(BC.from('74657374')).toHex()).to.be.equal('7465');
  });
  it('will decode up to length', () => {
    expect(new BytesFixedLength('test', 1).decodeFromBytes(BC.from('74657374')).toHex()).to.be.equal('74');
    expect(new BytesFixedLength('test', 2).decodeFromBytes(BC.from('74657374')).toHex()).to.be.equal('7465');
  });
  it('will set a default id', () => {
    expect(new BytesFixedLength(false, 1).id).to.be.equal('bytes_fixed_length_1');
  });
  it('will return the encoded size as the given size', () => {
    expect(new BytesFixedLength('test', 1).encodedSize).to.be.equal(1);
    expect(new BytesFixedLength('test', 100).encodedSize).to.be.equal(100);
  });
});
