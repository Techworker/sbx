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

    return signWithHash(keyPair, digest);
  }

  /**
   * TODO
   * @param operation
   */
  signMultiOperation(operation, keyPairs) {
    const DigestCoder = Operations.digestCoderFor(operation);
    const coder = new DigestCoder(operation.opType);
    let digest = coder.encodeToBytes(operation);

    console.log(digest.toHex());
    let signatures = {};

    operation.senders.forEach(sender => {
      if (signatures[sender.account.account] === undefined) {
        signatures[sender.account.account] = signWithHash(
          keyPairs[sender.account.account], digest
        );
      }
      sender.withSign(
        signatures[sender.account.account].r,
        signatures[sender.account.account].s
      );
    });
    operation.changers.forEach(changer => {
      if (signatures[changer.account.account] === undefined) {
        signatures[changer.account.account] = signWithHash(
          keyPairs[changer.account.account], digest
        );
      }
      changer.withSign(
        signatures[changer.account.account].r,
        signatures[changer.account.account].s
      );
    });

    return operation;
  }
}

module.exports = Signer;
