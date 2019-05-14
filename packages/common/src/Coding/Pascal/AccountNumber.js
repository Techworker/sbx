/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const AccountNumberType = require('./../../Types/AccountNumber');
const Endian = require('./../../Endian');
const Int32 = require('./../Core/Int32');

/**
 * A special Int32 type that can handle account number.
 */
class AccountNumber extends Int32 {

  /**
   * Constructor
   *
   * @param {String} id
   */
  constructor(id = null) {
    super(id || 'account', true, Endian.LITTLE_ENDIAN);
    this.description('An account number');
  }

  /**
   * @inheritDoc AbstractType#typeInfo
   */
  /* istanbul ignore next */
  get typeInfo() {
    let info = super.typeInfo;

    info.name = 'AccountNumber';
    info.hierarchy.push(info.name);
    return info;
  }

  /**
   * Reads a value and returns a new PascalCoin AccountNumber instance.
   *
   * @param {BC|Buffer|Uint8Array|String} bc
   * @param {Object} options
   * @param {*} all
   * @returns {AccountNumberType}
   */
  decodeFromBytes(bc, options = {}, all = null) {
    return new AccountNumberType(super.decodeFromBytes(bc));
  }

  /**
   *
   * Appends the given pascalcoin account number to the BC.
   *
   * @param {AccountNumberType} value
   * @return {BC}
   */
  encodeToBytes(value) {
    return super.encodeToBytes(value.account);
  }

  /**
   * @inheritDoc AbstractType#describe
   */
  /* istanbul ignore next */
  describe(value) {
    return super.describe(value);
  }
}

module.exports = AccountNumber;
