const Int64 = require('@pascalcoin-sbx/common').Coding.Core.Int64;
const Endian = require('@pascalcoin-sbx/common').Endian;
const BC = require('@pascalcoin-sbx/common').BC;
const BN = require('bn.js');
const chai = require('chai');
const expect = chai.expect;

describe('Coding.Core.Int64', () => {
  it('can encode unsigned Int64 values to bytes', () => {
    expect(new Int64('test', true, Endian.LITTLE_ENDIAN).encodeToBytes(new BN(0)).toHex()).to.be.equal('0000000000000000');
    expect(new Int64('test', true, Endian.LITTLE_ENDIAN).encodeToBytes(new BN(1)).toHex()).to.be.equal('0100000000000000');
    expect(new Int64('test', true, Endian.LITTLE_ENDIAN).encodeToBytes(new BN('18446744073709551615')).toHex()).to.be.equal('FFFFFFFFFFFFFFFF');
    expect(new Int64('test', true, Endian.LITTLE_ENDIAN).encodeToBytes(new BN(4294967295)).toHex()).to.be.equal('FFFFFFFF00000000');
    expect(new Int64('test', true, Endian.LITTLE_ENDIAN).encodeToBytes(new BN(65535)).toHex()).to.be.equal('FFFF000000000000');

    expect(new Int64('test', true, Endian.BIG_ENDIAN).encodeToBytes(new BN(1)).toHex()).to.be.equal('0000000000000001');
    expect(new Int64('test', true, Endian.BIG_ENDIAN).encodeToBytes(new BN('18446744073709551615')).toHex()).to.be.equal('FFFFFFFFFFFFFFFF');
    expect(new Int64('test', true, Endian.BIG_ENDIAN).encodeToBytes(new BN(4294967295)).toHex()).to.be.equal('00000000FFFFFFFF');
    expect(new Int64('test', true, Endian.BIG_ENDIAN).encodeToBytes(new BN(65535)).toHex()).to.be.equal('000000000000FFFF');

    // out of range
    expect(() => new Int64('test', true).encodeToBytes(new BN(-1))).to.throw();
    // TODO: // what happens to this test on 32bit systems?
    expect(() => new Int64('test', true).encodeToBytes(new BN('18446744073709551616'))).to.throw();
  });

  it('can decode unsigned Int64 bytes to int', () => {
    expect(new Int64('test', true, Endian.LITTLE_ENDIAN).decodeFromBytes(BC.from('0000000000000000')).toString()).to.be.equal('0');
    expect(new Int64('test', true, Endian.LITTLE_ENDIAN).decodeFromBytes(BC.from('0100000000000000')).toString()).to.be.equal('1');
    expect(new Int64('test', true, Endian.LITTLE_ENDIAN).decodeFromBytes(BC.from('FFFFFFFFFFFFFFFF')).toString()).to.be.equal('18446744073709551615');
    expect(new Int64('test', true, Endian.LITTLE_ENDIAN).decodeFromBytes(BC.from('FFFFFFFF00000000')).toString()).to.be.equal('4294967295');
    expect(new Int64('test', true, Endian.LITTLE_ENDIAN).decodeFromBytes(BC.from('FFFF000000000000')).toString()).to.be.equal('65535');

    expect(new Int64('test', true, Endian.BIG_ENDIAN).decodeFromBytes(BC.from('0000000000000001')).toString()).to.be.equal('1');
    expect(new Int64('test', true, Endian.BIG_ENDIAN).decodeFromBytes(BC.from('FFFFFFFFFFFFFFFF')).toString()).to.be.equal('18446744073709551615');
    expect(new Int64('test', true, Endian.BIG_ENDIAN).decodeFromBytes(BC.from('00000000FFFFFFFF')).toString()).to.be.equal('4294967295');
    expect(new Int64('test', true, Endian.BIG_ENDIAN).decodeFromBytes(BC.from('000000000000FFFF')).toString()).to.be.equal('65535');
  });

  it('can encode signed Int64 values to bytes', () => {
    expect(new Int64('test', false, Endian.LITTLE_ENDIAN).encodeToBytes(new BN('-1')).toHex()).to.be.equal('FFFFFFFFFFFFFFFF');
    expect(new Int64('test', false, Endian.LITTLE_ENDIAN).encodeToBytes(new BN('1')).toHex()).to.be.equal('0100000000000000');

    expect(new Int64('test', false, Endian.LITTLE_ENDIAN).encodeToBytes(new BN(0)).toHex()).to.be.equal('0000000000000000');
    expect(new Int64('test', false, Endian.LITTLE_ENDIAN).encodeToBytes(new BN(1)).toHex()).to.be.equal('0100000000000000');
    expect(new Int64('test', false, Endian.LITTLE_ENDIAN).encodeToBytes(new BN('9223372036854775807')).toHex()).to.be.equal('FFFFFFFFFFFFFF7F');
    expect(new Int64('test', false, Endian.LITTLE_ENDIAN).encodeToBytes(new BN('-9223372036854775808')).toHex()).to.be.equal('0000000000000080');

    expect(new Int64('test', false, Endian.BIG_ENDIAN).encodeToBytes(new BN(0)).toHex()).to.be.equal('0000000000000000');
    expect(new Int64('test', false, Endian.BIG_ENDIAN).encodeToBytes(new BN(1)).toHex()).to.be.equal('0000000000000001');
    expect(new Int64('test', false, Endian.BIG_ENDIAN).encodeToBytes(new BN('9223372036854775807')).toHex()).to.be.equal('7FFFFFFFFFFFFFFF');
    expect(new Int64('test', false, Endian.BIG_ENDIAN).encodeToBytes(new BN('-9223372036854775808')).toHex()).to.be.equal('8000000000000000');

    // out of range
    expect(() => new Int64('test', false).encodeToBytes(new BN('9223372036854775808'))).to.throw();
    expect(() => new Int64('test', false).encodeToBytes(new BN('-9223372036854775809'))).to.throw();
  });

  it('can decode signed Int64 bytes to int', () => {
    expect(new Int64('test', false, Endian.LITTLE_ENDIAN).decodeFromBytes(BC.from('0000000000000000')).toString()).to.be.equal('0');
    expect(new Int64('test', false, Endian.LITTLE_ENDIAN).decodeFromBytes(BC.from('0100000000000000')).toString()).to.be.equal('1');
    expect(new Int64('test', false, Endian.LITTLE_ENDIAN).decodeFromBytes(BC.from('FFFFFFFFFFFFFF7F')).toString()).to.be.equal('9223372036854775807');
    expect(new Int64('test', false, Endian.LITTLE_ENDIAN).decodeFromBytes(BC.from('0000000000000080')).toString()).to.be.equal('-9223372036854775808');

    expect(new Int64('test', false, Endian.BIG_ENDIAN).decodeFromBytes(BC.from('0000000000000001')).toString()).to.be.equal('1');
    expect(new Int64('test', false, Endian.BIG_ENDIAN).decodeFromBytes(BC.from('7FFFFFFFFFFFFFFF')).toString()).to.be.equal('9223372036854775807');
    expect(new Int64('test', false, Endian.BIG_ENDIAN).decodeFromBytes(BC.from('8000000000000000')).toString()).to.be.equal('-9223372036854775808');
  });

  it('will return a default id', () => {
    expect(new Int64(false).id).to.be.equal('int64');
  });
  it('will return a default encoded size', () => {
    expect(new Int64(false).encodedSize).to.be.equal(8);
  });
  it('will not accept something that is not a number', () => {
    expect(() => new Int64(false).encodeToBytes('AAA')).to.throw();
    expect(() => new Int64(false).encodeToBytes(() => 'A')).to.throw();
  });
});
