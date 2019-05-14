/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const Abstract = require('./../../Abstract');
const AccountNumber = require('@pascalcoin-sbx/common').Types.AccountNumber;

const P_SIGNER = Symbol('signer');
const P_TARGET = Symbol('target');
const P_NEW_PUBLIC_KEY = Symbol('new_public_key');

/**
 * Representation of a signable ChangeKeySigned operation.
 */
class ChangeKeySigned extends Abstract {
  /**
   * Gets the optype.
   *
   * @returns {number}
   */
  get opType() {
    return 7;
  }

  /**
   * Constructor.
   *
   * @param {Account|AccountNumber|Number|String} accountSigner
   * @param {Account|AccountNumber|Number|String} accountTarget
   * @param {PublicKey} newPublicKey
   */
  constructor(accountSigner, accountTarget, newPublicKey) {
    super();
    this[P_SIGNER] = new AccountNumber(accountSigner);
    this[P_TARGET] = new AccountNumber(accountTarget);
    this[P_NEW_PUBLIC_KEY] = newPublicKey;
  }

  /**
   * Gets the account number of the signer.
   *
   * @return {AccountNumber}
   */
  get signer() {
    return this[P_SIGNER];
  }

  /**
   * Gets the account number of the account to be changed.
   *
   * @return {AccountNumber}
   */
  get target() {
    return this[P_TARGET];
  }

  /**
   * Gets the new public key of the target account.
   *
   * @return {PublicKey}
   */
  get newPublicKey() {
    return this[P_NEW_PUBLIC_KEY];
  }
}

module.exports = ChangeKeySigned;
