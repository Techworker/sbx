const BC = require('@pascalcoin-sbx/common').BC;
const Endian = require('@pascalcoin-sbx/common').Endian;
const StringWithLength = require('@pascalcoin-sbx/common').Coding.Core.StringWithLength;
const chai = require('chai');
const expect = chai.expect;

describe('Coding.Core.StringWithLength', () => {
  it('can encode a string with int8 length', () => {
    expect(new StringWithLength('test', 1).encodeToBytes('test').toHex()).to.be.equal('0474657374');
    expect(() => new StringWithLength('test', 1).encodeToBytes('A'.repeat(256)).toHex()).to.throw();
  });

  it('can decode a string with int8 length', () => {
    expect(new StringWithLength('test', 1).decodeFromBytes(BC.from('0474657374'))).to.be.equal('test');
  });

  it('can encode a string with int16 length', () => {
    expect(new StringWithLength('test', 2).encodeToBytes('test').toHex()).to.be.equal('040074657374');
    expect(() => new StringWithLength('test', 2).encodeToBytes('A'.repeat(65536)).toHex()).to.throw();
  });

  it('can decode a string with int16 length', () => {
    expect(new StringWithLength('test', 2).decodeFromBytes(BC.from('040074657374'))).to.be.equal('test');
  });

  it('can encode a string with int32 length', () => {
    expect(new StringWithLength('test', 4).encodeToBytes('test').toHex()).to.be.equal('0400000074657374');
  });

  it('can decode a string with int16 length', () => {
    expect(new StringWithLength('test', 4).decodeFromBytes(BC.from('0400000074657374'))).to.be.equal('test');
  });

  it('throws an error with wrong int size', () => {
    expect(() => new StringWithLength('test', 100)).to.throw();
  });
  it('will return a default id', () => {
    expect(new StringWithLength(false).id).to.be.equal('string_size8');
    expect(new StringWithLength(false, 1).id).to.be.equal('string_size8');
    expect(new StringWithLength(false, 2).id).to.be.equal('string_size16');
    expect(new StringWithLength(false, 4).id).to.be.equal('string_size32');
  });
  it('will set a description for the length field', () => {
    expect(new StringWithLength(false, 1, 'length', 'A').lengthField.description()).to.be.eql(['1byte 8bit int value', 'A']);
  });
  it('will return the encoded size as the given size', () => {
    let enc = new StringWithLength('test', 1);
    enc.encodeToBytes('test');
    expect(enc.encodedSize).to.be.equal(5);

    enc = new StringWithLength('test', 2);
    enc.encodeToBytes('test');
    expect(enc.encodedSize).to.be.equal(6);

    enc = new StringWithLength('test', 4);
    enc.encodeToBytes('test');
    expect(enc.encodedSize).to.be.equal(8);
  });
  it('can handle zero byte values at the beginning', () => {
    let enc = new StringWithLength('test', 1, 'length', 'A', Endian.LITTLE_ENDIAN, true);
    expect(enc.encodeToBytes('test').toHex()).to.be.equal('040074657374');
    expect(enc.decodeFromBytes(BC.fromHex('040074657374').toString())).to.be.equal('test');
  });

});
