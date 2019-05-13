const Curve = require('./Curve');
const BytesWithLength = require('../../Core/BytesWithLength');
const CompositeType = require('../../CompositeType');
const BC = require('../../../BC');
const Sha = require('../../../Sha');
const Base58 = require('../../../Base58');
const PascalPublicKey = require('./../../../../src/Types/Keys/PublicKey');

/**
 * A Public Key value.
 */
class PublicKey extends CompositeType {

  /**
   * Constructor.
   *
   * @param {String} id
   */
  constructor(id = null) {
    super(id || 'pubkey');
    this.addSubType(new Curve('curve'));
    this.addSubType(new BytesWithLength('x', 2));
    this.addSubType(new BytesWithLength('y', 2));
  }

  /**
   * @inheritDoc AbstractType#typeInfo
   */
  /* istanbul ignore next */
  get typeInfo() {
    let info = super.typeInfo;

    info.name = 'PublicKey';
    info.hierarchy.push(info.name);
    return info;
  }

  /**
   * Reads a value and returns a new PascalCoin PublicKey instance.
   *
   * @param {BC} bc
   * @returns {PascalPublicKey}
   */
  decodeFromBytes(bc) {
    const decoded = super.decodeFromBytes(bc);

    return new PascalPublicKey(decoded.x, decoded.y, decoded.curve);
  }

  /**
   * Gets the base58 representation of a public key.
   *
   * @returns {String}
   */
  encodeToBase58(publicKey) {
    const prefix = BC.fromHex('01');
    const encoded = this.encodeToBytes(publicKey);
    const aux = Sha.sha256(encoded);
    const suffix = aux.slice(0, 4);

    const raw = BC.concat(prefix, encoded, suffix);

    return Base58.encode(raw);
  }

  /**
   * Gets a public key instance from the given base58 string.
   *
   * @param {String} base58
   * @returns {PublicKey}
   */
  decodeFromBase58(base58) {
    const decoded = Base58.decode(base58);

    return this.decodeFromBytes(decoded.slice(1, -4));
  }
}

module.exports = PublicKey;
