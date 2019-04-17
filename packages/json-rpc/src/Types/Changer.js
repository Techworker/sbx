/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const Abstract = require('./Abstract');
const AccountNumber = require('@pascalcoin-sbx/common').Types.AccountNumber;
const AccountName = require('@pascalcoin-sbx/common').Types.AccountName;
const Currency = require('@pascalcoin-sbx/common').Types.Currency;
const PublicKey = require('@pascalcoin-sbx/common').Types.Keys.PublicKey;
const BC = require('@pascalcoin-sbx/common').BC;

const P_ACCOUNT = Symbol('account');
const P_N_OPERATION = Symbol('nOperation');
const P_NEW_ENC_PUBKEY = Symbol('newPublicKey');
const P_NEW_NAME = Symbol('new_name');
const P_NEW_TYPE = Symbol('new_type');
const P_SELLER_ACCOUNT = Symbol('sellerAccount');
const P_ACCOUNT_PRICE = Symbol('account_price');
const P_LOCKED_UNTIL_BLOCK = Symbol('lockedUntilBlock');
const P_FEE = Symbol('fee');

/**
 * Represents a Changer in an operation.
 */
class Changer extends Abstract {
  /**
   * Creates a new instance of the Changer class.
   *
   * @param {Object} data
   */
  constructor(data) {
    super(data);

    this[P_ACCOUNT] = new AccountNumber(data.account);
    this[P_N_OPERATION] = null;
    if (data.n_operation !== undefined) {
      this[P_N_OPERATION] = parseInt(data.n_operation, 10);
    }

    this[P_NEW_ENC_PUBKEY] = null;
    if (data.new_enc_pubkey !== undefined) {
      this[P_NEW_ENC_PUBKEY] = PublicKey.decode(BC.fromHex(data.new_enc_pubkey));
    }

    this[P_NEW_NAME] = null;
    if (data.new_name !== undefined) {
      this[P_NEW_NAME] = new AccountName(data.new_name);
    }

    this[P_NEW_TYPE] = null;
    if (data.new_type !== undefined) {
      this[P_NEW_TYPE] = data.new_type;
    }

    this[P_SELLER_ACCOUNT] = null;
    if (data.seller_account !== undefined) {
      this[P_SELLER_ACCOUNT] = new AccountNumber(data.seller_account);
    }

    this[P_ACCOUNT_PRICE] = null;
    if (data.account_price !== undefined) {
      this[P_ACCOUNT_PRICE] = new Currency(data.account_price);
    }

    this[P_LOCKED_UNTIL_BLOCK] = null;
    if (data.locked_until_block !== undefined) {
      this[P_LOCKED_UNTIL_BLOCK] = parseInt(data.locked_until_block, 10);
    }

    this[P_FEE] = new Currency(0);
    if (data.fee !== undefined) {
      this[P_FEE] = new Currency(data.fee);
    }
  }

  /**
   * Gets the changed account.
   *
   * @returns {AccountNumber}
   */
  get account() {
    return this[P_ACCOUNT];
  }

  /**
   * Gets the n op of the account.
   *
   * @returns {Number}
   */
  get nOperation() {
    return this[P_N_OPERATION];
  }

  /**
   * Gets the new public key.
   *
   * @returns {PublicKey|null}
   */
  get newPublicKey() {
    return this[P_NEW_ENC_PUBKEY];
  }

  /**
   * Gets the new name.
   *
   * @returns {String|null}
   */
  get newName() {
    return this[P_NEW_NAME];
  }

  /**
   * Gets the new type.
   *
   * @returns {Number|null}
   */
  get newType() {
    return this[P_NEW_TYPE];
  }

  /**
   * Gets the seller account.
   *
   * @returns {AccountNumber|null}
   */
  get sellerAccount() {
    return this[P_SELLER_ACCOUNT];
  }

  /**
   * Gets the sales price of the account.
   *
   * @returns {Currency|null}
   */
  get accountPrice() {
    return this[P_ACCOUNT_PRICE];
  }

  /**
   * Gets the block number until the account is blocked.
   *
   * @returns {Number|null}
   */
  get lockedUntilBlock() {
    return this[P_LOCKED_UNTIL_BLOCK];
  }

  /**
   * Gets the fee for the change operation.
   *
   * @returns {Currency|null}
   */
  get fee() {
    return this[P_FEE];
  }
}

module.exports = Changer;
