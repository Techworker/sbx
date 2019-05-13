const BC = require('@pascalcoin-sbx/common').BC;
const CompositeType = require('@pascalcoin-sbx/common').Coding.CompositeType;
const Decissive = require('@pascalcoin-sbx/common').Coding.Decissive;
const Int8 = require('@pascalcoin-sbx/common').Coding.Core.Int8;
const Int16 = require('@pascalcoin-sbx/common').Coding.Core.Int16;
const Int32 = require('@pascalcoin-sbx/common').Coding.Core.Int32;
const chai = require('chai');
const expect = chai.expect;

describe('Coding.Core.Decissive', () => {
  it('can encode something based on a marker value', () => {

    // we will encode two numbers, one int8 and, depending on the first value, either a int8, int16 or int32 value
    const coder = new CompositeType('test');

    coder.addSubType(new Int8('marker', true));
    const decissiveCoder = new Decissive('value', 'marker', (markerValue) => {
      switch (markerValue) {
        case 1:
          return new Int8();
        case 2:
          return new Int16();
        case 3:
          return new Int32();
      }
    });

    coder.addSubType(decissiveCoder);
    let encodeValues = {
      marker: 1,
      value: 1
    };

    expect(coder.encodeToBytes(encodeValues).toHex()).to.be.equal('0101');
    encodeValues.marker = 2;
    encodeValues.value = 2;
    expect(coder.encodeToBytes(encodeValues).toHex()).to.be.equal('020200');
    encodeValues.marker = 3;
    encodeValues.value = 3;
    expect(coder.encodeToBytes(encodeValues).toHex()).to.be.equal('0303000000');
  });

  it('can decode something based on a marker value', () => {

    // we will encode two numbers, one int8 and, depending on the first value, either a int8, int16 or int32 value
    const coder = new CompositeType('test');

    coder.addSubType(new Int8('marker', true));
    const decissiveCoder = new Decissive('value', 'marker', (markerValue) => {
      switch (markerValue) {
        case 1:
          return new Int8();
        case 2:
          return new Int16();
        case 3:
          return new Int32();
      }
    });

    coder.addSubType(decissiveCoder);
    let encoded = BC.from('0101');
    let result = coder.decodeFromBytes(encoded);
    expect(result.marker).to.be.equal(1);
    expect(result.value).to.be.equal(1);

    encoded = BC.from('020200');
    result = coder.decodeFromBytes(encoded);
    expect(result.marker).to.be.equal(2);
    expect(result.value).to.be.equal(2);

    encoded = BC.from('0303000000');
    result = coder.decodeFromBytes(encoded);
    expect(result.marker).to.be.equal(3);
    expect(result.value).to.be.equal(3);
  });

  it('sets a default field id', () => {
    expect(new Decissive(false, null).id).to.be.equal('decissive');
  });
});
