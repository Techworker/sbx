/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

'use strict';

const sha256 = require('mipher/dist/sha256');
const sha512 = require('mipher/dist/sha512');
const BC = require('./BC');

/**
 * Holds methods to hash.
 */
class Sha {
  /**
   * Calculates the sha256 hash from the given buffers.
   *
   * @param {...BC} buffers
   * @returns {BC}
   */
  static sha256(...buffers) {
    const hasher = new sha256.SHA256();

    buffers.forEach(buffer => hasher.update(buffer.buffer));
    return new BC(Buffer.from(hasher.digest()));
  }

  /**
   * Calculates the sha512 hash from the given buffers.
   *
   * @param {...BC} buffers
   * @returns {Buffer}
   */
  static sha512(...buffers) {
    const hasher = new sha512.SHA512();

    buffers.forEach(buffer => hasher.update(buffer.buffer));
    return new BC(Buffer.from(hasher.digest()));
  }
}

module.exports = Sha;
