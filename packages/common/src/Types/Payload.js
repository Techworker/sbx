const P_PAYLOAD = Symbol('payload');
const P_TYPE = Symbol('type');

class Payload {

  /**
   * Payload encryption and encoding method not specified.
   *
   * @returns {number}
   */
  static get NON_DETERMISTIC() {
    return 0;
  }

  /**
   * Unencrypted, public payload.
   *
   * @returns {number}
   */
  static get ENC_PUBLIC() {
    return 1;
  }

  /**
   * ECIES encrypted using recipient accounts public key.
   *
   * @returns {number}
   */
  static get ENC_RECEIVER() {
    return 2;
  }

  /**
   * ECIES encrypted using sender accounts public key.
   *
   * @returns {number}
   */
  static get ENC_SENDER() {
    return 4;
  }

  /**
   * AES encrypted using pwd param
   *
   * @returns {number}
   */
  static get ENC_PASSWORD() {
    return 8;
  }

  /**
   * Payload data encoded in ASCII
   *
   * @returns {number}
   */
  static get FORMAT_ASCII() {
    return 16;
  }

  /**
   * Payload data encoded in HEX
   *
   * @returns {number}
   */
  static get FORMAT_HEX() {
    return 32;
  }

  /**
   * Payload data encoded in Base58
   *
   * @returns {number}
   */
  static get FORMAT_BASE58() {
    return 64;
  }

  /**
   * E-PASA addressed by account name (not number).
   *
   * @returns {number}
   */
  static get ADDRESSED_BY_NAME() {
    return 128;
  }

  /**
   * The max payload length for PUBLIC payloads in ASCII form.
   *
   * @returns {number}
   */
  static get MAX_PUBLIC_ASCII() {
    return 255;
  }

  /**
   * The max payload length for ECIES payloads in ASCII form.
   *
   * @returns {number}
   */
  static get MAX_ECIES_ASCII() {
    return 144;
  }

  /**
   * The max payload length for AES payloads in ASCII form.
   *
   * @returns {number}
   */
  static get MAX_AES_ASCII() {
    return 223;
  }

  /**
   * The max payload length for PUBLIC payloads in HEX form.
   *
   * @returns {number}
   */
  static get MAX_PUBLIC_HEX() {
    return 510;
  }

  /**
   * The max payload length for ECIES payloads in HEX form.
   *
   * @returns {number}
   */
  static get MAX_ECIES_HEX() {
    return 288;
  }

  /**
   * The max payload length for AES payloads in HEX form.
   *
   * @returns {number}
   */
  static get MAX_AES_HEX() {
    return 446;
  }

  /**
   * The max payload length for PUBLIC payloads in BASE58 form.
   *
   * @returns {number}
   */
  static get MAX_PUBLIC_BASE58() {
    return 348;
  }

  /**
   * The max payload length for ECIES payloads in BASE58 form.
   *
   * @returns {number}
   */
  static get MAX_ECIES_BASE58() {
    return 196;
  }

  /**
   * The max payload length for AES payloads in BASE58 form.
   *
   * @returns {number}
   */
  static get MAX_AES_BASE58() {
    return 304;
  }

  constructor(payload, type = Payload.NON_DETERMISTIC) {
    this[P_PAYLOAD] = payload;
    this[P_TYPE] = type;
  }

  get payload() {
    return this[P_PAYLOAD];
  }

  get type() {
    return this[P_TYPE];
  }

  toHex() {
    return this[P_PAYLOAD].toHex();
  }

  toString() {
    return this[P_PAYLOAD].toString();
  }
}

module.exports = Payload;
