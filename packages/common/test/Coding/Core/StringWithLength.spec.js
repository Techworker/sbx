const BC = require('@pascalcoin-sbx/common').BC;
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

});
