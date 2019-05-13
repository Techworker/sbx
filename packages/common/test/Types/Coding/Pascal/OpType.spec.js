const BC = require('@pascalcoin-sbx/common').BC;
const OpTypeCoder = require('@pascalcoin-sbx/common').Coding.Pascal.OpType;
const chai = require('chai');
const expect = chai.expect;

describe('Coding.Pascal.OpType', () => {
  it('can encode a pascalcoin opType in int8', () => {
    expect(new OpTypeCoder('test', 1).encodeToBytes(9).toHex()).to.be.equal('09');
  });
  it('can decode a pascalcoin opType to int8', () => {
    expect(new OpTypeCoder('test', 1).decodeFromBytes(BC.from('09'))).to.be.equal(9);
  });
  it('can encode a pascalcoin opType in int16', () => {
    expect(new OpTypeCoder('test', 2).encodeToBytes(9).toHex()).to.be.equal('0900');
  });
  it('can decode a pascalcoin opType to int16', () => {
    expect(new OpTypeCoder('test', 2).decodeFromBytes(BC.from('0900'))).to.be.equal(9);
  });
  it('can encode a pascalcoin opType in int32', () => {
    expect(new OpTypeCoder('test', 4).encodeToBytes(9).toHex()).to.be.equal('09000000');
  });
  it('can decode a pascalcoin opType to int32', () => {
    expect(new OpTypeCoder('test', 4).decodeFromBytes(BC.from('09000000'))).to.be.equal(9);
  });
  it('cannot handle a wrong bytesize', () => {
    expect(() => new OpTypeCoder('test', 100)).to.throw();
  });
});
