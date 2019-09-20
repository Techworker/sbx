const BC = require('@pascalcoin-sbx/common').BC;
const OpTypeCoder = require('@pascalcoin-sbx/common').Coding.Pascal.OpType;
const Int8 = require('@pascalcoin-sbx/common').Coding.Core.Int8;
const Int16 = require('@pascalcoin-sbx/common').Coding.Core.Int16;
const Int32 = require('@pascalcoin-sbx/common').Coding.Core.Int32;
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
  it('will return the proper encoded size', () => {
    let coder = new OpTypeCoder('test', 4);
    coder.decodeFromBytes(BC.from('09000000'));
    expect(coder.encodedSize).to.be.equal(4);
    coder = new OpTypeCoder('test', 2);
    coder.decodeFromBytes(BC.from('0900'));
    expect(coder.encodedSize).to.be.equal(2);
    coder = new OpTypeCoder('test', 1);
    coder.decodeFromBytes(BC.from('09'));
    expect(coder.encodedSize).to.be.equal(1);
  });
  it('will return the proper int type', () => {
    let coder = new OpTypeCoder('test', 4);
    expect(coder.intType).to.be.instanceof(Int32);
    coder = new OpTypeCoder('test', 2);
    expect(coder.intType).to.be.instanceof(Int16);
    coder = new OpTypeCoder('test', 1);
    expect(coder.intType).to.be.instanceof(Int8);
  });

  it('will set a default id', () => {
    let coder = new OpTypeCoder(false, 4);
    expect(coder.id).to.be.equal('optype_int32');
    coder = new OpTypeCoder(false, 2);
    expect(coder.id).to.be.equal('optype_int16');
    coder = new OpTypeCoder(false, 1);
    expect(coder.id).to.be.equal('optype_int8');
  })
});
