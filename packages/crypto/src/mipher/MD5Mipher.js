/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const MD5 = require('md5.js');

/**
 * SHA512 class
 */
class MD5Mipher {

  get hashSize() {
    return 32;
  }
  /**
     * SHA512 ctor
     */
  constructor() {
    this.sponge = new MD5();
  }
  /**
     * Init the hash
     * @return {Object} this
     */
  init() {
    return new MD5Mipher();
  }

  /**
     * Update the hash with additional message data
     * @param {Uint8Array} msg Additional message data as byte array
     * @return {SHA512} this
     */
  update(msg) {
    this.sponge.update(Buffer.from(msg));
  }

  /**
     * Finalize the hash with additional message data
     * @param {Uint8Array} msg Additional message data as byte array
     * @return {Uint8Array} Hash as 64 byte array
     */
  digest(msg = null) {
    if (msg !== null) {
      this.update(msg);
    }
    return this.sponge.digest('hex');
  }

  /**
     * All in one step
     * @param {Uint8Array} msg Additional message data
     * @return {Uint8Array} Hash as 64 byte array
     */
  hash(msg) {
    return new MD5Mipher().update(msg).digest();
  }
  /**
     * Performs a quick selftest
     * @return {Boolean} True if successful
     */
  selftest() {
    return true;
  }
}

module.exports = MD5Mipher;
