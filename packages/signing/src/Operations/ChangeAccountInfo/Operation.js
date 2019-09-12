/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const Abstract = require('./../../Abstract');

const BC = require('@pascalcoin-sbx/common').BC;
const PublicKey = require('@pascalcoin-sbx/common').Types.Keys.PublicKey;
const AccountNumber = require('@pascalcoin-sbx/common').Types.AccountNumber;
const AccountName = require('@pascalcoin-sbx/common').Types.AccountName;

const P_ACCOUNT_SIGNER = Symbol('account_signer');
const P_ACCOUNT_TARGET = Symbol('account_target');
const P_NEW_PUBLIC_KEY = Symbol('new_public_key');
const P_NEW_NAME = Symbol('new_name');
const P_NEW_TYPE = Symbol('new_type');
const P_NEW_DATA = Symbol('new_data');

const P_WITH_NEW_PUBKEY = Symbol('with_new_pubkey');
const P_WITH_NEW_NAME = Symbol('with_new_name');
const P_WITH_NEW_TYPE = Symbol('with_new_type');
const P_WITH_NEW_DATA = Symbol('with_new_data');

/**
 * Representation of a signable ChangeAccountInfo operation.
 */
class ChangeAccountInfo extends Abstract {
  /**
   * Gets the optype.
   *
   * @returns {number}
   */
  get opType() {
    return 8;
  }

  /**
   * Constructor.
   *
   * @param {Account|AccountNumber|Number|String} accountSigner
   * @param {Account|AccountNumber|Number|String} accountTarget
   */
  constructor(accountSigner, accountTarget) {
    super();
    this[P_ACCOUNT_SIGNER] = new AccountNumber(accountSigner);
    this[P_ACCOUNT_TARGET] = new AccountNumber(accountTarget);
    this[P_NEW_PUBLIC_KEY] = PublicKey.empty();
    this[P_NEW_NAME] = BC.fromString('');
    this[P_NEW_DATA] = BC.fromString('');
    // TODO: Im not so sure if this is correct
    this[P_NEW_TYPE] = 0;

    this[P_WITH_NEW_PUBKEY] = false;
    this[P_WITH_NEW_NAME] = false;
    this[P_WITH_NEW_TYPE] = false;
    this[P_WITH_NEW_DATA] = false;
  }

  /**
   * Gets the signer account of the operation.
   *
   * @return {AccountNumber}
   */
  get signer() {
    return this[P_ACCOUNT_SIGNER];
  }

  /**
   * Gets the target account to change.
   *
   * @return {AccountNumber}
   */
  get target() {
    return this[P_ACCOUNT_TARGET];
  }

  /**
   * Gets the new public key of the target.
   *
   * @return {PublicKey}
   */
  get newPublicKey() {
    return this[P_NEW_PUBLIC_KEY];
  }

  /**
   * Gets the new name of the target.
   *
   * @return {AccountName}
   */
  get newName() {
    return this[P_NEW_NAME];
  }

  /**
   * Gets the new type of the target account.
   *
   * @return {Number}
   */
  get newType() {
    return this[P_NEW_TYPE];
  }

  /**
   * Gets the new data for the account.
   *
   * @return {BC}
   */
  get newData() {
    return this[P_NEW_DATA];
  }

  /**
   * Gets the change type of the op.
   *
   * @returns {number}
   */
  get changeType() {
    let changeType = 0;

    if (this[P_WITH_NEW_PUBKEY] === true) {
      changeType |= 1;
    }
    if (this[P_WITH_NEW_NAME] === true) {
      changeType |= 2;
    }
    if (this[P_WITH_NEW_TYPE] === true) {
      changeType |= 4;
    }
    if (this[P_WITH_NEW_DATA] === true) {
      changeType |= 8;
    }

    return changeType;
  }

  /**
   * Will set the new public key.
   *
   * @param {PublicKey} publicKey
   * @returns {ChangeAccountInfo}
   */
  withNewPublicKey(publicKey) {
    this[P_NEW_PUBLIC_KEY] = publicKey;
    this[P_WITH_NEW_PUBKEY] = true;
    return this;
  }

  /**
     * Will set the new name of the account.
     *
     * @param {String|AccountName} newName
     * @returns {ChangeAccountInfo}
     */
  withNewName(newName) {
    this[P_NEW_NAME] = new AccountName(newName);
    this[P_WITH_NEW_NAME] = true;
    return this;
  }

  /**
     * Will set the new type of the account.
     *
     * @param {Number} newType
     * @returns {ChangeAccountInfo}
     */
  withNewType(newType) {
    this[P_NEW_TYPE] = newType;
    this[P_WITH_NEW_TYPE] = true;
    return this;
  }

  /**
   * Will set the new public key.
   *
   * @param {BC} data
   * @returns {ChangeAccountInfo}
   */
  withNewData(data) {
    this[P_NEW_DATA] = data;
    this[P_WITH_NEW_DATA] = true;
    return this;
  }

}

module.exports = ChangeAccountInfo;
