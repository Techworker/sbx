/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const AccountNameType = require('./../../Types/AccountName');
const StringWithLength = require('../Core/StringWithLength');

/**
 * A pascal related type that can de/encode an account name.
 */
class AccountName extends StringWithLength {

  /**
   * Constructor
   *
   * @param {String} id
   */
  constructor(id = null, byteSize = 2) {
    super(id || 'account_name', byteSize);
    this.description('An account name');
  }

  /**
   * Reads a value and returns a new PascalCoin AccountNumber instance.
   *
   * @param {BC|Buffer|Uint8Array|String} bc
   * @param {Object} options
   * @param {*} all
   * @returns {AccountNameType}
   */
  decodeFromBytes(bc, options = {}, all = null) {
    return new AccountNameType(super.decodeFromBytes(bc));
  }

  /**
   *
   * Appends the given pascalcoin account number to the BC.
   *
   * @param {AccountNameType} value
   */
  encodeToBytes(value) {
    value = this.determineValue(value);
    return super.encodeToBytes(new AccountNameType(value).toString());
  }
}

module.exports = AccountName;
