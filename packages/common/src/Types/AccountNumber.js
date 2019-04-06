/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const History = require('../History');

const P_ACCOUNT = Symbol('account');
const P_CHECKSUM = Symbol('checksum');
const P_CREATED_IN_BLOCK = Symbol('created_in_block');
const P_IS_FOUNDATION_REWARD = Symbol('is_foundation_reward');

/**
 * A simple type that holds an account number in a reliable way.
 */
class AccountNumber {
  /**
   * Creates a new AccountNumber instance, either from an account string
   * without checksum (which can be a number), an account string with checksum
   * or another account instance.
   *
   * @param {String|Number|AccountNumber|Account} account
   */
  constructor(account) {
    if (account instanceof AccountNumber) {
      this[P_ACCOUNT] = account[P_ACCOUNT];
      this[P_CHECKSUM] = account[P_CHECKSUM];
    } else if (typeof account === 'string') {
      const splitted = account.split('-');

      splitted.map(s => {
        if (isNaN(s) || parseInt(s, 10).toString() !== s) {
          throw new Error(`Invalid account number part: ${s}`);
        }
      });

      if (splitted.length === 2) {
        this[P_ACCOUNT] = parseInt(splitted[0], 10);
        this[P_CHECKSUM] = parseInt(splitted[1], 10);
        if (this[P_CHECKSUM] !== AccountNumber.calculateChecksum(this[P_ACCOUNT])) {
          throw new Error(`Invalid checksum for account ${this[P_ACCOUNT]}`);
        }
      } else {
        this[P_ACCOUNT] = parseInt(account, 10);
        this[P_CHECKSUM] = AccountNumber.calculateChecksum(this[P_ACCOUNT]);
      }
    } else if (typeof account === 'number') {
      this[P_ACCOUNT] = account;
      this[P_CHECKSUM] = AccountNumber.calculateChecksum(this[P_ACCOUNT]);
    } else {
      throw new Error(`Unable to parse Account: ${account.toString()}`);
    }

    this[P_CREATED_IN_BLOCK] = Math.floor(this[P_ACCOUNT] / 5);
    this[P_IS_FOUNDATION_REWARD] = History.isDeveloperReward(this[P_CREATED_IN_BLOCK]) && this[P_ACCOUNT] % 5 === 4;
  }

  /**
   * Gets the account number.
   *
   * @returns {Number}
   */
  get account() {
    return this[P_ACCOUNT];
  }

  /**
   * Gets the checksum of the account.
   *
   * @returns {Number}
   */
  get checksum() {
    return this[P_CHECKSUM];
  }

  /**
   * Gets the block number the account was created in.
   *
   * @returns {Number}
   */
  get createdInBlock() {
    return this[P_CREATED_IN_BLOCK];
  }

  /**
   * Gets a value indicating whether the foundation got this account initially.
   *
   * @returns {Boolean}
   */
  get isFoundationReward() {
    return this[P_IS_FOUNDATION_REWARD];
  }

  /**
   * Gets the account string.
   *
   * @returns {string}
   */
  toString() {
    return `${this.account}-${this.checksum}`;
  }

  /**
   * Gets a value indicating whether the given account equals the current
   * account.
   *
   * @param {AccountNumber|String|Number} accountNumber
   * @returns {boolean}
   */
  equals(accountNumber) {
    return (accountNumber !== null && this.toString() === accountNumber.toString());
  }

  /**
   * Calculates the checksum for the given account number.
   *
   * @param {Number} account
   * @returns {Number}
   */
  static calculateChecksum(account) {
    return ((account * 101) % 89) + 10;
  }
}

module.exports = AccountNumber;
