class Abstract {
  /**
   * Encrypts the given value.
   *
   * @param {Buffer|Uint8Array|BC|String} value
   * @param {Object} options
   * @return {BC}
   */
  static encrypt(value, options = {}) {
    throw new Error('encrypt not implemented');
  }

  /**
   * Decrypts the given bytes.
   *
   * @param {Buffer|Uint8Array|BC|String} value
   * @param {Object} options
   * @return {BC}
   */
  static decrypt(value, options = {}) {
    throw new Error('decrypt not implemented');
  }
}

module.exports = Abstract;
