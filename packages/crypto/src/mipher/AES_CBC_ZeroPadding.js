const mipherAES = require('mipher/dist/aes');
const mipherPadding = require('mipher/dist/padding');

/**
 * AES-CBC + ZeroPadding integration using the mipher library
 */
class AES_CBC_ZeroPadding {

  /**
   * Constructor
   */
  constructor() {
    this.cipher = new mipherAES.AES_CBC();
    this.padding = new mipherPadding.ZeroPadding();
  }

  /**
   * Encrypts using the given values.
   *
   * @param key
   * @param pt
   * @param iv
   * @returns {Uint8Array}
   */
  encrypt(key, pt, iv) {
    return this.cipher.encrypt(key, this.padding.pad(pt, this.cipher.cipher.blockSize), iv);
  }

  /**
   * Decrypts using the given values.
   *
   * @param key
   * @param ct
   * @param iv
   * @returns {Uint8Array}
   */
  decrypt(key, ct, iv) {
    return this.padding.strip(this.cipher.decrypt(key, ct, iv));
  };
}

module.exports = AES_CBC_ZeroPadding;
