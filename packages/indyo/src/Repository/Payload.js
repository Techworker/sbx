const BC = require('@pascalcoin-sbx/common').BC;
const PayloadType = require('@pascalcoin-sbx/common').Types.Payload;
const Base58 = require('@pascalcoin-sbx/common').Base58;
const Crypto = require('@pascalcoin-sbx/crypto');

const M_CREATE_BC_FROM_FORMAT = Symbol('createBCFromFormat');

/**
 * A class to manage payloads.
 */
class Payload {
  /**
   * Payload encryption and encoding method not specified.
   *
   * @returns {number}
   */
  static get NON_DETERMISTIC() {
    return PayloadType.NON_DETERMISTIC;
  }

  /**
   * Unencrypted, public payload.
   *
   * @returns {number}
   */
  static get ENC_PUBLIC() {
    return PayloadType.ENC_PUBLIC;
  }

  /**
   * ECIES encrypted using recipient accounts public key.
   *
   * @returns {number}
   */
  static get ENC_RECEIVER() {
    return PayloadType.ENC_RECEIVER;
  }

  /**
   * ECIES encrypted using sender accounts public key.
   *
   * @returns {number}
   */
  static get ENC_SENDER() {
    return PayloadType.ENC_SENDER;
  }

  /**
   * AES encrypted using pwd param
   *
   * @returns {number}
   */
  static get ENC_PASSWORD() {
    return PayloadType.ENC_PASSWORD;
  }

  /**
   * Payload data encoded in ASCII
   *
   * @returns {number}
   */
  static get FORMAT_ASCII() {
    return 'ABC';
  }

  /**
   * Payload data encoded in HEX
   *
   * @returns {number}
   */
  static get FORMAT_HEX() {
    return PayloadType.FORMAT_HEX;
  }

  /**
   * Payload data encoded in Base58
   *
   * @returns {number}
   */
  static get FORMAT_BASE58() {
    return PayloadType.FORMAT_BASE58;
  }

  /**
   * Creates a new public (unencrypted) payload from the given payload in
   * the given format.
   *
   * @param {String|BC|}payload
   * @param format
   * @return {Payload}
   */
  public(payload, format = PayloadType.FORMAT_HEX) {
    payload = this[M_CREATE_BC_FROM_FORMAT](payload, format);
    return new PayloadType(
      BC.fromString(payload),
      format | PayloadType.ENC_PUBLIC
    );
  }

  /**
   * Creates a new encrypted payload using the given encryption method.
   *
   * @param {String|BC} payload
   * @param {Number} format
   * @param {Number} enc
   * @param {Object} options
   * @return {Payload}
   */
  encrypted(payload, format = PayloadType.FORMAT_HEX, enc = PayloadType.ENC_PASSWORD, options = {
    password: ''
  }) {
    payload = this[M_CREATE_BC_FROM_FORMAT](payload, format);
    switch (enc) {
      case PayloadType.ENC_PASSWORD:
        payload = Crypto.Encryption.Pascal.Password.encrypt(payload, { password: options.password });
        break;
      case PayloadType.ENC_RECEIVER:
      case PayloadType.ENC_SENDER:
        payload = Crypto.Encryption.Pascal.ECIES.encrypt(payload, { publicKey: options.publicKey });
        break;
    }

    return new PayloadType(BC.fromString(payload), format | enc);
  }

  /**
   * Gets a receiver encrypted payload.
   *
   * @param {String|BC} payload
   * @param {Number} format
   * @param {PublicKey} publicKey
   * @return {Payload}
   */
  receiverEncrypted(payload, format, publicKey) {
    return this.encrypted(payload, format, Payload.ENC_RECEIVER, {publicKey});
  }

  /**
   * Gets a sender encrypted payload.
   *
   * @param {String|BC} payload
   * @param {Number} format
   * @param {PublicKey} publicKey
   * @return {Payload}
   */
  senderEncrypted(payload, format, publicKey) {
    return this.encrypted(payload, format, Payload.ENC_SENDER, {publicKey});
  }

  /**
   * Gets a password encrypted payload.
   *
   * @param {String|BC} payload
   * @param {Number} format
   * @param {PublicKey} publicKey
   * @return {Payload}
   */
  passwordEncrypted(payload, format, password) {
    return this.encrypted(payload, format, Payload.ENC_PASSWORD, {password});
  }

  /**
   * Tries to decrypt a payload using the available information in the payload type field.
   *
   * @param {Payload} payload
   * @param {Object} options
   * @return {BC|false|*}
   */
  decrypt(payload, options) {
    if (((payload.type & PayloadType.ENC_PASSWORD) === PayloadType.ENC_PASSWORD)) {
      return Crypto.Encryption.Pascal.Password.decrypt(payload.payload, { password: options.password });
    } else if (((payload.type & PayloadType.ENC_SENDER) === PayloadType.ENC_SENDER) ||
      ((payload.type & PayloadType.ENC_RECEIVER) === PayloadType.ENC_RECEIVER)) {
      return Crypto.Encryption.Pascal.ECIES.decrypt(payload.payload, { keyPair: options.keyPair });
    }

    return payload.payload;
  }

  /**
   * Decodes the given payload value and returns a BC instance.
   *
   * @param {String|BC} payload
   * @param {Number} format
   * @return {BC}
   */
  [M_CREATE_BC_FROM_FORMAT](payload, format) {
    switch (format) {
      case PayloadType.FORMAT_ASCII:
        payload = BC.fromString(payload);
        break;
      case PayloadType.FORMAT_BASE58:
        payload = Base58.decode(payload);
        break;
      case PayloadType.FORMAT_HEX:
        payload = BC.from(payload);
        break;
    }

    return payload;
  }
}

module.exports = Payload;
