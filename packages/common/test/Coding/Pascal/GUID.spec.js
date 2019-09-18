const BC = require('@pascalcoin-sbx/common').BC;
const GUIDCoder = require('@pascalcoin-sbx/common').Coding.Pascal.GUID;
const GUID = require('@pascalcoin-sbx/common').Types.GUID;
const chai = require('chai');
const expect = chai.expect;

const SAMPLE_GUID = '6865726D-616E-6973-616E-6964696F7421';
const SAMPLE_GUID_NO_HYPHEN = SAMPLE_GUID.replace(new RegExp('-', 'g'), '');


describe('Coding.Pascal.GUID', () => {
  it('can encode a guid', () => {
    expect(new GUIDCoder('guid').encodeToBytes(new GUID(SAMPLE_GUID)).toHex()).to.be.equal(SAMPLE_GUID_NO_HYPHEN);
  });
  it('can decode a guid', () => {
    expect(new GUIDCoder('guid').decodeFromBytes(BC.from(SAMPLE_GUID_NO_HYPHEN)).toString()).to.be.equal(SAMPLE_GUID);
  });
});
