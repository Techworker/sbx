const BC = require('@pascalcoin-sbx/common').BC;
const BytesWithoutLength = require('@pascalcoin-sbx/common').Coding.Core.BytesWithoutLength;
const chai = require('chai');
const expect = chai.expect;

describe('Coding.Core.BytesWithoutLength', () => {
  it('can encode bytes', () => {
    expect(new BytesWithoutLength('test').encodeToBytes(BC.from('74657374')).toHex()).to.be.equal('74657374');
  });

  it('can decode a string', () => {
    expect(new BytesWithoutLength('test').decodeFromBytes(BC.from('74657374').toHex())).to.be.equal('74657374');
  });

  it('sets a default field id', () => {
    expect(new BytesWithoutLength().id).to.be.equal('bytes_without_length');
  });

  it('will return the encoded size as the given size', () => {
    let enc = new BytesWithoutLength('test');
    enc.encodeToBytes(BC.from('test'));
    expect(enc.encodedSize).to.be.equal(4);
  });

});
