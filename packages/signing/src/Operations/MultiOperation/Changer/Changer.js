/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const Abstract = require('./../../../Abstract');
const AccountNumber = require('@pascalcoin-sbx/common').Types.AccountNumber;
const AccountName = require('@pascalcoin-sbx/common').Types.AccountName;

const P_ACCOUNT = Symbol('account');
const P_NEW_NAME = Symbol('new_name');
const P_NEW_TYPE = Symbol('new_type');
const P_NEW_PUBLIC_KEY = Symbol('new_public_key');
const P_CHANGE_TYPE = Symbol('change_type');

/**
 * Representation of a signable ChangeKey operation.
 */
class Changer extends Abstract {

  /**
   * Constructor.
   */
  constructor(account, newName, newType, newPublicKey, changeType) {
    super();
    this[P_ACCOUNT] = new AccountNumber(account);
    this[P_NEW_NAME] = new AccountName(newName === null ? '' : newName);
    this[P_NEW_TYPE] = newType;
    this[P_NEW_PUBLIC_KEY] = newPublicKey;
    this[P_CHANGE_TYPE] = changeType;
  }

  get account() {
    return this[P_ACCOUNT];
  }

  get newName() {
    return this[P_NEW_NAME];
  }
  get newType() {
    return this[P_NEW_TYPE];
  }
  get newPublicKey() {
    return this[P_NEW_PUBLIC_KEY];
  }
  get changeType() {
    return this[P_CHANGE_TYPE];
  }
}

module.exports = Changer;
