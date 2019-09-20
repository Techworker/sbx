const BC = require('@pascalcoin-sbx/common').BC;
const Endian = require('@pascalcoin-sbx/common').Endian;
const BytesWithLength = require('@pascalcoin-sbx/common').Coding.Core.BytesWithLength;
const chai = require('chai');
const expect = chai.expect;

describe('Coding.Core.BytesWithLength', () => {
  it('can encode bytes with int8 length', () => {
    expect(new BytesWithLength('test', 1).encodeToBytes(BC.from('74657374')).toHex()).to.be.equal('0474657374');
    expect(() => new BytesWithLength('test', 1).encodeToBytes(BC.from('AA'.repeat(256))).toHex()).to.throw();
  });

  it('can decode bytes with int8 length', () => {
    expect(new BytesWithLength('test', 1).decodeFromBytes(BC.from('0474657374')).toHex()).to.be.equal('74657374');
  });

  it('can encode a string with int16 length', () => {
    expect(new BytesWithLength('test', 2).encodeToBytes(BC.from('74657374')).toHex()).to.be.equal('040074657374');
    expect(() => new BytesWithLength('test', 2).encodeToBytes('AA'.repeat(65536)).toHex()).to.throw();
  });

  it('can decode a string with int16 length', () => {
    expect(new BytesWithLength('test', 2).decodeFromBytes(BC.from('040074657374')).toHex()).to.be.equal('74657374');
  });

  it('can encode a string with int32 length', () => {
    expect(new BytesWithLength('test', 4).encodeToBytes(BC.from('74657374')).toHex()).to.be.equal('0400000074657374');
  });

  it('can decode a string with int32 length', () => {
    expect(new BytesWithLength('test', 4).decodeFromBytes(BC.from('0400000074657374')).toHex()).to.be.equal('74657374');
  });

  it('throws an error with wrong int size', () => {
    expect(() => new BytesWithLength('test', 100)).to.throw();
  });
  it('will set a default id', () => {
    expect(new BytesWithLength(false, 1).id).to.be.equal('bytes_with_length_8');
    expect(new BytesWithLength(false, 2).id).to.be.equal('bytes_with_length_16');
  });
  it('will set a description for the length field', () => {
    expect(new BytesWithLength(false, 1, 'length', 'A').lengthField.description()).to.be.eql(['1byte 8bit int value', 'A']);
  });
  it('will return the encoded size as the given size', () => {
    let enc = new BytesWithLength('test', 1);

    enc.encodeToBytes(BC.from('test'));
    expect(enc.encodedSize).to.be.equal(5);
    enc = new BytesWithLength('test', 2);
    enc.encodeToBytes(BC.from('test'));
    expect(enc.encodedSize).to.be.equal(6);
    enc = new BytesWithLength('test', 4);
    enc.encodeToBytes(BC.from('test'));
    expect(enc.encodedSize).to.be.equal(8);
  });

  it('can handle zero byte values at the beginning', () => {
    let enc = new BytesWithLength('test', 1, 'length', 'A', Endian.LITTLE_ENDIAN, true);
    expect(enc.encodeToBytes('test').toHex()).to.be.equal('040074657374');
    expect(enc.decodeFromBytes(BC.fromHex('040074657374').toString())).to.be.equal('test');
  });
});
