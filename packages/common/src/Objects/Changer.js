/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const Abstract = require('./Abstract');
const AccountNumber = require('./../Types/AccountNumber');
const AccountName = require('./../Types/AccountName');
const Currency = require('./../Types/Currency');
const BC = require('./../BC');
const PublicKeyCoder = require('./../Coding/Pascal/Keys/PublicKey');

const pkCoder = new PublicKeyCoder();

const P_ACCOUNT_NUMBER = Symbol('account.accountNumber');
const P_N_OPERATION = Symbol('n_operation.nOperation');
const P_NEW_PUBLIC_KEY = Symbol('new_enc_pubkey.newPublicKey');
const P_NEW_NAME = Symbol('new_name.newName');
const P_NEW_TYPE = Symbol('new_type.newType');
const P_SELLER_ACCOUNT_NUMBER = Symbol('seller_account.sellerAccountNumber');
const P_ACCOUNT_PRICE = Symbol('account_price_s.accountPrice');
const P_LOCKED_UNTIL_BLOCK_NUMBER = Symbol('locked_until_block.lockedUntilBlockNumber');
const P_FEE = Symbol('fee_s.fee');
const P_CHANGES = Symbol('changes');
const P_HASHED_SECRET = Symbol('hashed_secret.hashedSecret');

const ALL_PROPS = [
  P_ACCOUNT_NUMBER, P_N_OPERATION, P_NEW_PUBLIC_KEY, P_NEW_NAME, P_NEW_TYPE,
  P_SELLER_ACCOUNT_NUMBER, P_ACCOUNT_PRICE, P_LOCKED_UNTIL_BLOCK_NUMBER, P_FEE,
  P_CHANGES, P_HASHED_SECRET
];

/**
 * Represents a Changer in an operation.
 */
class Changer extends Abstract {
  /**
   * Creates a new instance of the Changer class.
   *
   * @param {Object} mappedData
   */
  static createFromObject(data) {

    let changer = new this(data);

    let mappedData = changer.mapInitializationDataWithProperties(ALL_PROPS);

    changer[P_ACCOUNT_NUMBER] = new AccountNumber(mappedData[P_ACCOUNT_NUMBER]);

    changer[P_CHANGES] = null;
    if (mappedData[P_CHANGES] !== undefined) {
      changer[P_CHANGES] = mappedData[P_CHANGES];
    }

    changer[P_N_OPERATION] = null;
    if (mappedData[P_N_OPERATION] !== undefined) {
      changer[P_N_OPERATION] = parseInt(mappedData[P_N_OPERATION], 10);
    }

    changer[P_HASHED_SECRET] = null;
    if (mappedData[P_HASHED_SECRET] !== undefined) {
      changer[P_HASHED_SECRET] = BC.fromHex(mappedData[P_HASHED_SECRET]);
    }

    changer[P_NEW_PUBLIC_KEY] = null;
    if (mappedData[P_NEW_PUBLIC_KEY] !== undefined) {
      changer[P_NEW_PUBLIC_KEY] = pkCoder.decodeFromBytes(BC.fromHex(mappedData[P_NEW_PUBLIC_KEY]));
    }

    changer[P_NEW_NAME] = null;
    if (mappedData[P_NEW_NAME] !== undefined) {
      changer[P_NEW_NAME] = new AccountName(mappedData[P_NEW_NAME]);
    }

    changer[P_NEW_TYPE] = null;
    if (mappedData[P_NEW_TYPE] !== undefined) {
      changer[P_NEW_TYPE] = mappedData[P_NEW_TYPE];
    }

    changer[P_SELLER_ACCOUNT_NUMBER] = null;
    if (mappedData[P_SELLER_ACCOUNT_NUMBER] !== undefined) {
      changer[P_SELLER_ACCOUNT_NUMBER] = new AccountNumber(mappedData[P_SELLER_ACCOUNT_NUMBER]);
    }

    changer[P_ACCOUNT_PRICE] = new Currency(0);
    if (mappedData[P_ACCOUNT_PRICE] !== undefined) {
      changer[P_ACCOUNT_PRICE] = new Currency(mappedData[P_ACCOUNT_PRICE]);
    }

    changer[P_LOCKED_UNTIL_BLOCK_NUMBER] = null;
    if (mappedData[P_LOCKED_UNTIL_BLOCK_NUMBER] !== undefined) {
      changer[P_LOCKED_UNTIL_BLOCK_NUMBER] = parseInt(mappedData[P_LOCKED_UNTIL_BLOCK_NUMBER], 10);
    }

    changer[P_FEE] = new Currency(0);
    if (mappedData[P_FEE] !== undefined) {
      changer[P_FEE] = new Currency(mappedData[P_FEE]);
    }

    return changer;
  }

  /**
   * Gets the changed account.
   *
   * @returns {AccountNumber}
   */
  get accountNumber() {
    return this[P_ACCOUNT_NUMBER];
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
    return this[P_NEW_PUBLIC_KEY];
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
  get sellerAccountNumber() {
    return this[P_SELLER_ACCOUNT_NUMBER];
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
  get lockedUntilBlockNumber() {
    return this[P_LOCKED_UNTIL_BLOCK_NUMBER];
  }

  /**
   * Gets the fee for the change operation.
   *
   * @returns {Currency|null}
   */
  get fee() {
    return this[P_FEE];
  }

  /**
   * Gets the changes identifier.
   *
   * @return {String}
   */
  get changes() {
    return this[P_CHANGES];
  }

  /**
   * Gets the hashedSecret
   *
   * @return {BC}
   */
  get hashedSecret() {
    return this[P_HASHED_SECRET];
  }
}

module.exports = Changer;
