/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const mipherAES = require('mipher/dist/aes');
const mipherPadding = require('mipher/dist/padding');

function zeroPad(bin, blocksize) {
  let len = bin.length % blocksize ? blocksize - (bin.length % blocksize) : blocksize;
  let out = Buffer.from(new Array(bin.length + len).fill(0));

  out.fill(bin, 0, bin.length);
  return out;
}

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
    return this.cipher.encrypt(key, zeroPad(pt, this.cipher.cipher.blockSize), iv);
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
