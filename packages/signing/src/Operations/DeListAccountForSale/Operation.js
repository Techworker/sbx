/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const Abstract = require('./../../Abstract');
const PublicKey = require('@pascalcoin-sbx/common').Types.Keys.PublicKey;
const AccountNumber = require('@pascalcoin-sbx/common').Types.AccountNumber;
const Currency = require('@pascalcoin-sbx/common').Types.Currency;

const P_ACCOUNT_SIGNER = Symbol('account_signer');
const P_ACCOUNT_TARGET = Symbol('account_target');
const P_PRICE = Symbol('price');
const P_ACCOUNT_TO_PAY = Symbol('account_to_pay');
const P_NEW_PUBLIC_KEY = Symbol('new_public_key');
const P_LOCKED_UNTIL_BLOCK = Symbol('locked_until_block');

/**
 * Representation of a signable Delist operation.
 */
class DeListAccountForSale extends Abstract {
  /**
   * Gets the optype.
   *
   * @returns {number}
   */
  get opType() {
    return 5;
  }

  /**
   * Constructor.
   *
   * @param {Number|AccountNumber} accountSigner
   * @param {Number|AccountNumber} accountTarget
   */
  constructor(accountSigner, accountTarget) {
    super();
    this[P_ACCOUNT_SIGNER] = new AccountNumber(accountSigner);
    this[P_ACCOUNT_TARGET] = new AccountNumber(accountTarget);
    this[P_PRICE] = new Currency(0);
    this[P_ACCOUNT_TO_PAY] = new AccountNumber(0);
    this[P_NEW_PUBLIC_KEY] = PublicKey.empty();
    this[P_LOCKED_UNTIL_BLOCK] = 0;

  }

  /**
   * Gets the signer of the delist operation.
   *
   * @return {AccountNumber}
   */
  get signer() {
    return this[P_ACCOUNT_SIGNER];
  }

  /**
   * Gets the account that should be delisted.
   *
   * @return {AccountNumber}
   */
  get target() {
    return this[P_ACCOUNT_TARGET];
  }

  /**
   * Gets the price of the account (defaulted to 0).
   *
   * @return {Currency}
   */
  get price() {
    return this[P_PRICE];
  }

  /**
   * Gets the account that should have received the amount on sale (defaulted to 0)
   *
   * @return {Currency}
   */
  get accountToPay() {
    return this[P_ACCOUNT_TO_PAY];
  }

  /**
   * Gets the new public key in case of a private sale (defaulted to an empty pubkey).
   *
   * @return {PublicKey}
   */
  get newPublicKey() {
    return this[P_NEW_PUBLIC_KEY];
  }

  /**
   * Gets the value until when the account is locked (defaulted to 0).
   *
   * @return {Number}
   */
  get lockedUntilBlock() {
    return this[P_LOCKED_UNTIL_BLOCK];
  }
}

module.exports = DeListAccountForSale;
