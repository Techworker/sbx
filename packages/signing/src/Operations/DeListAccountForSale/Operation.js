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
 * A transaction object that can be signed.
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
   *
   * @param accountSigner
   * @param accountTarget
   */
  constructor(accountSigner, accountTarget) {
    super();
    this[P_ACCOUNT_SIGNER] = new AccountNumber(accountSigner);
    this[P_ACCOUNT_TARGET] = new AccountNumber(accountTarget);
  }

  get signer() {
    return this[P_ACCOUNT_SIGNER];
  }

  get target() {
    return this[P_ACCOUNT_TARGET];
  }
}

module.exports = DeListAccountForSale;
