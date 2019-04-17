/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const Abstract = require('./../Abstract');
const BC = require('@pascalcoin-sbx/common').BC;
const PublicKey = require('@pascalcoin-sbx/common').Types.Keys.PublicKey;
const Currency = require('@pascalcoin-sbx/common').Types.Currency;
const AccountNumber = require('@pascalcoin-sbx/common').Types.AccountNumber;

const P_SENDER = Symbol('sender');
const P_TARGET = Symbol('target');
const P_AMOUNT = Symbol('amount');
const P_ACCOUNT_PRICE = Symbol('price');
const P_SELLER_ACCOUNT = Symbol('seller');
const P_NEW_PUBLIC_KEY = Symbol('new_public_key');

/**
 * A transaction object that can be signed.
 */
class BuyAccount extends Abstract {
  /**
   * Gets the optype.
   *
   * @returns {number}
   */
  static get OPTYPE() {
    return 6;
  }

  /**
   * Constructor
   *
   * @param {AccountNumber|Number} sender
   * @param {AccountNumber|Number} target
   * @param {Currency} amount
   * @param {Currency} price
   * @param {AccountNumber} seller
   * @param {PublicKey} newPublicKey
   */
  constructor(sender, target, amount, price, seller, newPublicKey) {
    super();
    this[P_SENDER] = new AccountNumber(sender);
    this[P_TARGET] = new AccountNumber(target);
    this[P_AMOUNT] = new Currency(amount);
    this[P_ACCOUNT_PRICE] = new Currency(price);
    this[P_SELLER_ACCOUNT] = new AccountNumber(seller);
    this[P_NEW_PUBLIC_KEY] = newPublicKey;
  }

  /**
   * Gets the digest of the operation.
   *
   * @returns {BC}
   */
  digest() {
    return BC.concat(
      this.bcFromInt(this[P_SENDER].account, 4),
      this.bcFromInt(this.nOperation, 4),
      this.bcFromInt(this[P_TARGET].account, 4),
      this.bcFromInt(this[P_AMOUNT].toMolina(), 8),
      this.bcFromInt(this.fee.toMolina(), 8),
      this.payload,
      this.bcFromInt(PublicKey.empty().curve.id, 2), // just zero as curve id
      this.bcFromInt(this[P_ACCOUNT_PRICE].toMolina(), 8),
      this.bcFromInt(this[P_SELLER_ACCOUNT].account, 4),
      this[P_NEW_PUBLIC_KEY].encode(),
      BC.fromInt(BuyAccount.OPTYPE),
    );
  }

  /**
   * Gets the signed raw operations.
   *
   * @returns {BC}
   */
  toRaw() {
    return BC.concat(
      this.bcFromInt(BuyAccount.OPTYPE, 4),
      this.bcFromInt(this[P_SENDER].account, 4),
      this.bcFromInt(this.nOperation, 4),
      this.bcFromInt(this[P_TARGET].account, 4),
      this.bcFromInt(this[P_AMOUNT].toMolina(), 8),
      this.bcFromInt(this.fee.toMolina(), 8),
      this.bcFromBcWithSize(this.payload),
      PublicKey.empty().encode(), // v2
      this.bcFromInt(2, 1), // buy account
      this.bcFromInt(this[P_ACCOUNT_PRICE].toMolina(), 8),
      this.bcFromInt(this[P_SELLER_ACCOUNT].account, 4),
      this[P_NEW_PUBLIC_KEY].encode(),
      this.bcFromSign(this.r, this.s),
    );
  }

  /**
   * Gets a new Operation object from the given signed operation.
   *
   * @param {BC|Buffer|String|Uint8Array} raw
   * @returns {BC}
   */
  static fromRaw(raw) {
    /*
    raw = BC.from(raw);
    const sender = raw.slice(4, 8).switchEndian().toInt();
    const target = raw.slice(12, 16).switchEndian().toInt();
    const amount = raw.slice(16, 24).switchEndian().toInt();
    const fee = raw.slice(24, 32).switchEndian().toInt();
    const payload = Abstract.readBCWithSize(raw, 32).value;
    const publicKey = Abstract.readBCWithSize(raw, 34 + payload.length).value;
    const price = raw.slice(36 + payload.length + publicKey.length, 8).switchEndian().toInt();
    const seller = raw.slice(44 + payload.length + publicKey.length, 4).switchEndian().toInt();
    const newPublicKey = Abstract.readBCWithSize(raw, 48 + payload.length + publicKey.length).value;

    const op = new BuyAccount(sender, target, amount, price, seller, newPublicKey);

    //op.withFee(dataType, dataSequence, amount);
    //op.withFee(fee);
    //op.withPayload(payload);

    return op;*/
  }
}

module.exports = BuyAccount;
