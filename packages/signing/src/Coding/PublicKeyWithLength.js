const PublicKey = require('@pascalcoin-sbx/common').Coding.Pascal.Keys.PublicKey;
const HexaStringWithLength = require('@pascalcoin-sbx/common').Coding.Core.BytesWithLength;
const PascalPublicKey = require('@pascalcoin-sbx/common').Types.Keys.PublicKey;

const publicKeyCoding = new PublicKey();

/**
 * A special Int32 type that can handle account number.
 */
class PublicKeyWithLength extends HexaStringWithLength {

  constructor(id = null) {
    super(id || 'pubkey');
  }

  /**
   * Reads a value and returns a new PascalCoin PublicKey instance.
   *
   * @param {BC} bc
   * @returns {PascalPublicKey}
   */
  decodeFromBytes(bc) {
    const pubKey = super.decodeFromBytes(bc);
    const parsed = publicKeyCoding.decodeFromBytes(pubKey);

    return new PascalPublicKey(parsed.x, parsed.y, parsed.curve);
  }

  /**
   * Reads a value and returns a new PascalCoin PublicKey instance.
   *
   * @param {*} value
   * @returns {PascalPublicKey}
   */
  encodeToBytes(value) {
    return super.encodeToBytes(publicKeyCoding.encodeToBytes(value));
  }
}

module.exports = PublicKeyWithLength;
