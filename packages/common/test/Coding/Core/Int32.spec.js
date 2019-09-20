const Int32 = require('@pascalcoin-sbx/common').Coding.Core.Int32;
const BC = require('@pascalcoin-sbx/common').BC;
const Endian = require('@pascalcoin-sbx/common').Endian;
const chai = require('chai');
const expect = chai.expect;

describe('Coding.Core.Int32', () => {
  it('can encode unsigned Int32 values to bytes', () => {
    expect(new Int32('test', true, Endian.LITTLE_ENDIAN).encodeToBytes(0).toHex()).to.be.equal('00000000');
    expect(new Int32('test', true, Endian.LITTLE_ENDIAN).encodeToBytes(1).toHex()).to.be.equal('01000000');
    expect(new Int32('test', true, Endian.LITTLE_ENDIAN).encodeToBytes(4294967295).toHex()).to.be.equal('FFFFFFFF');
    expect(new Int32('test', true, Endian.LITTLE_ENDIAN).encodeToBytes(65535).toHex()).to.be.equal('FFFF0000');
    expect(new Int32('test', true, Endian.BIG_ENDIAN).encodeToBytes(0).toHex()).to.be.equal('00000000');
    expect(new Int32('test', true, Endian.BIG_ENDIAN).encodeToBytes(1).toHex()).to.be.equal('00000001');
    expect(new Int32('test', true, Endian.BIG_ENDIAN).encodeToBytes(4294967295).toHex()).to.be.equal('FFFFFFFF');
    expect(new Int32('test', true, Endian.BIG_ENDIAN).encodeToBytes(65535).toHex()).to.be.equal('0000FFFF');

    // out of range
    expect(() => new Int32('test', true).encodeToBytes(-1)).to.throw();
    // TODO: // what happens to this test on 32bit systems?
    expect(() => new Int32('test', true).encodeToBytes(4294967296)).to.throw();
  });

  it('can decode unsigned Int32 bytes to int', () => {
    expect(new Int32('test', true, Endian.LITTLE_ENDIAN).decodeFromBytes(BC.from('00000000'))).to.be.equal(0);
    expect(new Int32('test', true, Endian.LITTLE_ENDIAN).decodeFromBytes(BC.from('01000000'))).to.be.equal(1);
    expect(new Int32('test', true, Endian.LITTLE_ENDIAN).decodeFromBytes(BC.from('FFFFFFFF'))).to.be.equal(4294967295);
    expect(new Int32('test', true, Endian.LITTLE_ENDIAN).decodeFromBytes(BC.from('FFFF0000'))).to.be.equal(65535);
    expect(new Int32('test', true, Endian.BIG_ENDIAN).decodeFromBytes(BC.from('00000000'))).to.be.equal(0);
    expect(new Int32('test', true, Endian.BIG_ENDIAN).decodeFromBytes(BC.from('00000001'))).to.be.equal(1);
    expect(new Int32('test', true, Endian.BIG_ENDIAN).decodeFromBytes(BC.from('FFFFFFFF'))).to.be.equal(4294967295);
    expect(new Int32('test', true, Endian.BIG_ENDIAN).decodeFromBytes(BC.from('0000FFFF'))).to.be.equal(65535);
  });

  it('can encode signed int32 values to bytes', () => {
    expect(new Int32('test', false, Endian.LITTLE_ENDIAN).encodeToBytes(0).toHex()).to.be.equal('00000000');
    expect(new Int32('test', false, Endian.LITTLE_ENDIAN).encodeToBytes(1).toHex()).to.be.equal('01000000');
    expect(new Int32('test', false, Endian.LITTLE_ENDIAN).encodeToBytes(-2147483648).toHex()).to.be.equal('00000080');
    expect(new Int32('test', false, Endian.LITTLE_ENDIAN).encodeToBytes(2147483647).toHex()).to.be.equal('FFFFFF7F');

    expect(new Int32('test', false, Endian.BIG_ENDIAN).encodeToBytes(1).toHex()).to.be.equal('00000001');
    expect(new Int32('test', false, Endian.BIG_ENDIAN).encodeToBytes(-2147483648).toHex()).to.be.equal('80000000');
    expect(new Int32('test', false, Endian.BIG_ENDIAN).encodeToBytes(2147483647).toHex()).to.be.equal('7FFFFFFF');

    // out of range
    expect(() => new Int32('test', false).encodeToBytes(-2147483649)).to.throw();
    expect(() => new Int32('test', false).encodeToBytes(2147483648)).to.throw();
  });

  it('can decode signed Int32 bytes to int', () => {
    expect(new Int32('test', false, Endian.LITTLE_ENDIAN).decodeFromBytes(BC.from('00000000'))).to.be.equal(0);
    expect(new Int32('test', false, Endian.LITTLE_ENDIAN).decodeFromBytes(BC.from('01000000'))).to.be.equal(1);
    expect(new Int32('test', false, Endian.LITTLE_ENDIAN).decodeFromBytes(BC.from('00000080'))).to.be.equal(-2147483648);
    expect(new Int32('test', false, Endian.LITTLE_ENDIAN).decodeFromBytes(BC.from('FFFFFF7F'))).to.be.equal(2147483647);
    expect(new Int32('test', false, Endian.BIG_ENDIAN).decodeFromBytes(BC.from('00000001'))).to.be.equal(1);
    expect(new Int32('test', false, Endian.BIG_ENDIAN).decodeFromBytes(BC.from('80000000'))).to.be.equal(-2147483648);
    expect(new Int32('test', false, Endian.BIG_ENDIAN).decodeFromBytes(BC.from('7FFFFFFF'))).to.be.equal(2147483647);
  });


  it('will return a default id', () => {
    expect(new Int32(false).id).to.be.equal('int32');
  });
  it('will return a default encoded size', () => {
    expect(new Int32(false).encodedSize).to.be.equal(4);
  });
  it('will not accept something that is not a number', () => {
    expect(() => new Int32(false).encodeToBytes('AAA')).to.throw();
    expect(() => new Int32(false).encodeToBytes(() => 'A')).to.throw();
  });
});
