/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const Abstract = require('./../../../Abstract');
const BC = require('@pascalcoin-sbx/common').BC;
const AccountNumber = require('@pascalcoin-sbx/common').Types.AccountNumber;
const AccountName = require('@pascalcoin-sbx/common').Types.AccountName;
const Currency = require('@pascalcoin-sbx/common').Types.Currency;

const P_ACCOUNT = Symbol('account');
const P_AMOUNT = Symbol('amount');

/**
 * Representation of a signable ChangeKey operation.
 */
class Sender extends Abstract {

  /**
   * Constructor.
   */
  constructor(account, amount) {
    super();
    this[P_ACCOUNT] = new AccountNumber(account);
    this[P_AMOUNT] = new Currency(amount);
  }

  get account() {
    return this[P_ACCOUNT];
  }

  addAmount(amount) {
    this[P_AMOUNT] = this[P_AMOUNT].add(new Currency(amount));
  }
  get amount() {
    return this[P_AMOUNT];
  }
}

module.exports = Sender;
