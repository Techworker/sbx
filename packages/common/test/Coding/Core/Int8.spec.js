const BC = require('@pascalcoin-sbx/common').BC;
const Int8 = require('@pascalcoin-sbx/common').Coding.Core.Int8;
const chai = require('chai');
const expect = chai.expect;

describe('Coding.Core.Int8', () => {
  it('can encode unsigned int8 values to bytes', () => {
    expect(new Int8('test', true).encodeToBytes(0).toHex()).to.be.equal('00');
    expect(new Int8('test', true).encodeToBytes(1).toHex()).to.be.equal('01');
    expect(new Int8('test', true).encodeToBytes(255).toHex()).to.be.equal('FF');

    // out of range
    expect(() => new Int8('test', true).encodeToBytes(-1)).to.throw();
    expect(() => new Int8('test', true).encodeToBytes(256)).to.throw();
  });

  it('can decode unsigned int8 bytes to an int', () => {
    expect(new Int8('test', true).decodeFromBytes(BC.from('00'))).to.be.equal(0);
    expect(new Int8('test', true).decodeFromBytes(BC.from('01'))).to.be.equal(1);
    expect(new Int8('test', true).decodeFromBytes(BC.from('FF'))).to.be.equal(255);
  });

  it('can encode signed int8 values to bytes', () => {
    expect(new Int8('test', false).encodeToBytes(0).toHex()).to.be.equal('00');
    expect(new Int8('test', false).encodeToBytes(1).toHex()).to.be.equal('01');
    expect(new Int8('test', false).encodeToBytes(-128).toHex()).to.be.equal('80');
    expect(new Int8('test', false).encodeToBytes(127).toHex()).to.be.equal('7F');

    // out of range
    expect(() => new Int8('test', false).encodeToBytes(-129)).to.throw();
    expect(() => new Int8('test', false).encodeToBytes(128)).to.throw();
  });

  it('can decode signed int8 values to bytes', () => {
    expect(new Int8('test', false).decodeFromBytes(BC.fromHex('00'))).to.be.equal(0);
    expect(new Int8('test', false).decodeFromBytes(BC.fromHex('01'))).to.be.equal(1);
    expect(new Int8('test', false).decodeFromBytes(BC.fromHex('80'))).to.be.equal(-128);
    expect(new Int8('test', false).decodeFromBytes(BC.fromHex('7F'))).to.be.equal(127);
  });

  it('will return a default id', () => {
    expect(new Int8(false).id).to.be.equal('int8');
  });
  it('will return a default encoded size', () => {
    expect(new Int8(false).encodedSize).to.be.equal(1);
  });
  it('will not accept something that is not a number', () => {
    expect(() => new Int8(false).encodeToBytes('AAA')).to.throw();
    expect(() => new Int8(false).encodeToBytes(() => 'A')).to.throw();
  });
});
