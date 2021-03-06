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
const BC = require('@pascalcoin-sbx/common').BC;
const PublicKeyCoder = require('@pascalcoin-sbx/common').Coding.Pascal.Keys.PublicKey;

const pkCoder = new PublicKeyCoder();

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
  static createFromRPC(data) {

    let changer = new Changer();

    changer[P_ACCOUNT] = new AccountNumber(data.account);
    changer[P_N_OPERATION] = null;
    if (data.n_operation !== undefined) {
      changer[P_N_OPERATION] = parseInt(data.n_operation, 10);
    }

    changer[P_NEW_ENC_PUBKEY] = null;
    if (data.new_enc_pubkey !== undefined) {
      changer[P_NEW_ENC_PUBKEY] = pkCoder.decodeFromBytes(BC.fromHex(data.new_enc_pubkey));
    }

    changer[P_NEW_NAME] = null;
    if (data.new_name !== undefined) {
      changer[P_NEW_NAME] = new AccountName(data.new_name);
    }

    changer[P_NEW_TYPE] = null;
    if (data.new_type !== undefined) {
      changer[P_NEW_TYPE] = data.new_type;
    }

    changer[P_SELLER_ACCOUNT] = null;
    if (data.seller_account !== undefined) {
      changer[P_SELLER_ACCOUNT] = new AccountNumber(data.seller_account);
    }

    changer[P_ACCOUNT_PRICE] = null;
    if (data.account_price !== undefined) {
      changer[P_ACCOUNT_PRICE] = new Currency(data.account_price);
    }

    changer[P_LOCKED_UNTIL_BLOCK] = null;
    if (data.locked_until_block !== undefined) {
      changer[P_LOCKED_UNTIL_BLOCK] = parseInt(data.locked_until_block, 10);
    }

    changer[P_FEE] = new Currency(0);
    if (data.fee !== undefined) {
      changer[P_FEE] = new Currency(data.fee);
    }

    return changer;
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
