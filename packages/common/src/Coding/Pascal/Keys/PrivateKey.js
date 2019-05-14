const Curve = require('./Curve');
const BytesWithLength = require('../../Core/BytesWithLength');
const CompositeType = require('../../CompositeType');
const PrivateKeyType = require('./../../../../src/Types/Keys/PrivateKey');

/**
 * A Public Key value.
 */
class PrivateKey extends CompositeType {

  /**
   * Constructor.
   *
   * @param {String} id
   */
  constructor(id = null) {
    super(id || 'pubkey');
    this.addSubType(new Curve('curve'));
    this.addSubType(new BytesWithLength('key', 2));
  }

  /**
   * @inheritDoc AbstractType#typeInfo
   */
  /* istanbul ignore next */
  get typeInfo() {
    let info = super.typeInfo;

    info.name = 'PrivateKey';
    info.hierarchy.push(info.name);
    return info;
  }

  /**
   * Reads a value and returns a new PascalCoin PublicKey instance.
   *
   * @param {BC} bc
   * @returns {PrivateKeyType}
   */
  decodeFromBytes(bc) {
    const decoded = super.decodeFromBytes(bc);

    return new PrivateKeyType(decoded.key, decoded.curve);
  }

  /**
   * Reads a value and returns a new PascalCoin PublicKey instance.
   *
   * @param {BC} bc
   * @returns {PrivateKeyType}
   */
  encodeToBytes(value) {
    return super.encodeToBytes(value);
  }
}

module.exports = PrivateKey;
