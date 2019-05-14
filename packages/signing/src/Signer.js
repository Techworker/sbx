/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const Sha = require('@pascalcoin-sbx/common').Sha;
const Keys = require('@pascalcoin-sbx/crypto').Keys;
const Operations = require('./Operations');

/**
 * Signs the given digest with the given keypair and returns the r and s
 * values (because thats all that is needed).
 *
 * @param {KeyPair} keyPair
 * @param {BC} digest
 */
function signWithHash(keyPair, digest) {
  const hash = Sha.sha256(digest);

  return Keys.sign(keyPair, hash);
}

/**
 * Signs the digest.
 *
 * @param {KeyPair} keyPair
 * @param {BC} digest
 * @return {{r: BC, s: BC}}
 */
function signWithDigest(keyPair, digest) {
  return Keys.sign(keyPair, digest);
}

class Signer {
  /**
   * Signs the given operation and returns a new rawoperations string.
   *
   * @param {KeyPair} keyPair
   * @param {Number} nOperation
   * @param {Boolean} useDigest
   * @returns {Abstract}
   */
  sign(keyPair, operation) {
    const DigestCoder = Operations.digestCoderFor(operation);
    const digest = new DigestCoder(operation.opType).encodeToBytes(operation);
    let signResult;

    if (operation.usesDigestToSign() === true) {
      signResult = signWithDigest(keyPair, digest);
    } else {
      signResult = signWithHash(keyPair, digest);
    }

    // save results
    return signResult;
  }

  /**
   * TODO
   * @param operation
   */
  signMultiOperation(operation) {
    // const DigestCoder = Operations.digestCoderFor(operation);
    // const digest = new DigestCoder(operation.opType).encodeToBytes(operation);
  }
}

module.exports = Signer;
