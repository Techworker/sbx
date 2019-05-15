const Endian = require('@pascalcoin-sbx/common').Endian;
const CommonCoding = require('@pascalcoin-sbx/common').Coding;
const CompositeType = require('@pascalcoin-sbx/common').Coding.CompositeType;
const Data = require('./Data');

class Coding extends CompositeType {
  constructor() {
    super('pascalcoin_ecies');
    this.description('Coding for an pascalcoin encrypted ECIES message');

    this.addSubType(new CommonCoding.Core.Int8('publicKeyLength', true));
    this.addSubType(new CommonCoding.Core.Int8('macLength', true));
    this.addSubType(new CommonCoding.Core.Int16('originalDataLength', true, Endian.LITTLE_ENDIAN));
    this.addSubType(new CommonCoding.Core.Int16('originalDataLengthIncPadLength', true, Endian.LITTLE_ENDIAN));
    this.addSubType(new CommonCoding.Decissive('publicKey', 'publicKeyLength', function (publicKeyLength) {
      return new CommonCoding.Core.BytesFixedLength('publicKey', publicKeyLength);
    }));
    this.addSubType(new CommonCoding.Decissive('mac', 'macLength', function (macLength) {
      return new CommonCoding.Core.BytesFixedLength('mac', macLength);
    }));
    this.addSubType(new CommonCoding.Core.BytesWithoutLength('encryptedData'));
  }

  /**
   *
   * @param bc
   * @param options
   * @param all
   * @return {ECIESData}
   */
  decodeFromBytes(bc, options = {}, all = null) {
    let decoded = super.decodeFromBytes(bc, options, all);
    let data = new Data();

    data.withPublicKey(decoded.publicKey);
    data.withOriginalDataLength(decoded.originalDataLength);
    data.withOriginalDataLengthIncPadLength(decoded.originalDataLengthIncPadLength);
    data.withMac(decoded.mac);
    data.withEncryptedData(decoded.encryptedData);

    return data;
  }
}

module.exports = Coding;
