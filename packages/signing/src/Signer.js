/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

'use strict';

const Sha = require('@sbx/common').Sha;
const Keys = require('@sbx/crypto').Keys;

class Signer {
  /**
   * Signs the given digest with the given keypair and returns the r and s
   * values (because thats all that is needed).
   *
   * @param {KeyPair} keyPair
   * @param {BC} digest
   */
  static signWithHash(keyPair, digest) {
    const hash = Sha.sha256(digest);

    return Keys.sign(keyPair, hash);
  }

  static signWithDigest(keyPair, digest) {
    return Keys.sign(keyPair, digest);
  }
}

module.exports = Signer;
