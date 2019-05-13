const BC = require('@pascalcoin-sbx/common').BC;
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
});
