/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const Abstract = require('./../Abstract');
const BC = require('@pascalcoin-sbx/common').BC;
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
class DelistAccountForSale extends Abstract {
  /**
   * Gets the optype.
   *
   * @returns {number}
   */
  static get OPTYPE() {
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
    this[P_PRICE] = new Currency(0);
    this[P_ACCOUNT_TO_PAY] = new AccountNumber(0);
    this[P_NEW_PUBLIC_KEY] = PublicKey.empty();
    this[P_LOCKED_UNTIL_BLOCK] = 0;
  }

  /**
   * Gets the digest of the operation.
   *
   * @returns {BC}
   */
  digest() {
    return BC.concat(
      this.bcFromInt(this[P_ACCOUNT_SIGNER].account, 4),
      this.bcFromInt(this[P_ACCOUNT_TARGET].account, 4),
      this.bcFromInt(this.nOperation, 4),
      this.bcFromInt(this[P_PRICE].toMolina(), 8),
      this.bcFromInt(this[P_ACCOUNT_TO_PAY].account, 4),
      this.bcFromInt(this.fee.toMolina(), 8),
      this.payload,
      this.bcFromInt(PublicKey.empty().curve.id, 2), // just zero as curve id
      this[P_NEW_PUBLIC_KEY].encode(),
      this.bcFromInt(this[P_LOCKED_UNTIL_BLOCK], 4),
      this.bcFromInt(DelistAccountForSale.OPTYPE),
    );
  }

  /**
   * Gets the raw implementation.
   *
   * @returns {BC}
   */
  toRaw() {
    return BC.concat(
      this.bcFromInt(DelistAccountForSale.OPTYPE, 4),
      this.bcFromInt(this[P_ACCOUNT_SIGNER].account, 4),
      this.bcFromInt(this[P_ACCOUNT_TARGET].account, 4),
      this.bcFromInt(5, 2), // list account for sale
      this.bcFromInt(this.nOperation, 4),
      this.bcFromInt(this.fee.toMolina(), 8),
      this.bcFromBcWithSize(this.payload),
      this.bcFromSign(this.r, this.s),
    );
  }
}

module.exports = DelistAccountForSale;
