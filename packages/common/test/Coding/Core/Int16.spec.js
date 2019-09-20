const BC = require('@pascalcoin-sbx/common').BC;
const Int16 = require('@pascalcoin-sbx/common').Coding.Core.Int16;
const Endian = require('@pascalcoin-sbx/common').Endian;
const chai = require('chai');
const expect = chai.expect;

describe('Coding.Core.Int16', () => {
  it('can encode unsigned Int16 values to bytes', () => {
    expect(new Int16('test', true, Endian.LITTLE_ENDIAN).encodeToBytes(0).toHex()).to.be.equal('0000');
    expect(new Int16('test', true, Endian.LITTLE_ENDIAN).encodeToBytes(1).toHex()).to.be.equal('0100');
    expect(new Int16('test', true, Endian.LITTLE_ENDIAN).encodeToBytes(65535).toHex()).to.be.equal('FFFF');
    expect(new Int16('test', true, Endian.BIG_ENDIAN).encodeToBytes(0).toHex()).to.be.equal('0000');
    expect(new Int16('test', true, Endian.BIG_ENDIAN).encodeToBytes(1).toHex()).to.be.equal('0001');
    expect(new Int16('test', true, Endian.BIG_ENDIAN).encodeToBytes(65535).toHex()).to.be.equal('FFFF');

    // out of range
    expect(() => new Int16('test', true).encodeToBytes(-1)).to.throw();
    expect(() => new Int16('test', true).encodeToBytes(65536)).to.throw();
  });

  it('can decode unsigned Int16 bytes to int int', () => {
    expect(new Int16('test', true, Endian.LITTLE_ENDIAN).decodeFromBytes(BC.from('0000'))).to.be.equal(0);
    expect(new Int16('test', true, Endian.LITTLE_ENDIAN).decodeFromBytes(BC.from('0100'))).to.be.equal(1);
    expect(new Int16('test', true, Endian.LITTLE_ENDIAN).decodeFromBytes(BC.from('FFFF'))).to.be.equal(65535);
    expect(new Int16('test', true, Endian.BIG_ENDIAN).decodeFromBytes(BC.from('0000'))).to.be.equal(0);
    expect(new Int16('test', true, Endian.BIG_ENDIAN).decodeFromBytes(BC.from('0001'))).to.be.equal(1);
    expect(new Int16('test', true, Endian.BIG_ENDIAN).decodeFromBytes(BC.from('FFFF'))).to.be.equal(65535);
  });

  it('can encode signed int8 values to bytes', () => {
    expect(new Int16('test', false, Endian.LITTLE_ENDIAN).encodeToBytes(0).toHex()).to.be.equal('0000');
    expect(new Int16('test', false, Endian.LITTLE_ENDIAN).encodeToBytes(1).toHex()).to.be.equal('0100');
    expect(new Int16('test', false, Endian.LITTLE_ENDIAN).encodeToBytes(-32768).toHex()).to.be.equal('0080');
    expect(new Int16('test', false, Endian.LITTLE_ENDIAN).encodeToBytes(32767).toHex()).to.be.equal('FF7F');

    expect(new Int16('test', false, Endian.BIG_ENDIAN).encodeToBytes(1).toHex()).to.be.equal('0001');
    expect(new Int16('test', false, Endian.BIG_ENDIAN).encodeToBytes(-32768).toHex()).to.be.equal('8000');
    expect(new Int16('test', false, Endian.BIG_ENDIAN).encodeToBytes(32767).toHex()).to.be.equal('7FFF');

    // out of range
    expect(() => new Int16('test', false).encodeToBytes(-32769)).to.throw();
    expect(() => new Int16('test', false).encodeToBytes(32768)).to.throw();
  });

  it('can decode signed Int16 bytes to int', () => {
    expect(new Int16('test', false, Endian.LITTLE_ENDIAN).decodeFromBytes(BC.from('0000'))).to.be.equal(0);
    expect(new Int16('test', false, Endian.LITTLE_ENDIAN).decodeFromBytes(BC.from('0100'))).to.be.equal(1);
    expect(new Int16('test', false, Endian.LITTLE_ENDIAN).decodeFromBytes(BC.from('0080'))).to.be.equal(-32768);
    expect(new Int16('test', false, Endian.LITTLE_ENDIAN).decodeFromBytes(BC.from('FF7F'))).to.be.equal(32767);

    expect(new Int16('test', false, Endian.BIG_ENDIAN).decodeFromBytes(BC.from('0000'))).to.be.equal(0);
    expect(new Int16('test', false, Endian.BIG_ENDIAN).decodeFromBytes(BC.from('0001'))).to.be.equal(1);
    expect(new Int16('test', false, Endian.BIG_ENDIAN).decodeFromBytes(BC.from('8000'))).to.be.equal(-32768);
    expect(new Int16('test', false, Endian.BIG_ENDIAN).decodeFromBytes(BC.from('7FFF'))).to.be.equal(32767);
  });

  it('will return a default id', () => {
    expect(new Int16(false).id).to.be.equal('int16');
  });
  it('will return a default encoded size', () => {
    expect(new Int16(false).encodedSize).to.be.equal(2);
  });
  it('will not accept something that is not a number', () => {
    expect(() => new Int16(false).encodeToBytes('AAA')).to.throw();
    expect(() => new Int16(false).encodeToBytes(() => 'A')).to.throw();
  });
});
