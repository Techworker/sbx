/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const Abstract = require('./../Abstract');
const BC = require('@sbx/common').BC;
const PublicKey = require('@sbx/common').Types.Keys.PublicKey;
const AccountNumber = require('@sbx/common').Types.AccountNumber;

const P_ACCOUNT_SIGNER = Symbol('account_signer');
const P_NEW_PUBLIC_KEY = Symbol('new_public_key');

/**
 * A transaction object that can be signed.
 */
class ChangeKey extends Abstract {
  /**
     * Gets the optype.
     *
     * @returns {number}
     */
  static get OPTYPE() {
    return 2;
  }

  /**
     *
     * @param {Account|AccountNumber|Number|String} accountSigner
     * @param {PublicKey} newPublicKey
     */
  constructor(accountSigner, newPublicKey) {
    super();
    this[P_ACCOUNT_SIGNER] = new AccountNumber(accountSigner);
    this[P_NEW_PUBLIC_KEY] = newPublicKey;
  }

  /**
     * Gets the digest of the operation.
     *
     * @returns {BC}
     */
  digest() {
    return BC.concat(
      this.bcFromInt(this[P_ACCOUNT_SIGNER].account, 4),
      this.bcFromInt(this.nOperation, 4),
      this.bcFromInt(this.fee.toMolina(), 8),
      this.payload,
      this.bcFromInt(PublicKey.empty().curve.id, 2), // just zero as curve id
      this[P_NEW_PUBLIC_KEY].encode(),
      this.bcFromInt(ChangeKey.OPTYPE),
    );
  }

  /**
     * Gets the raw implementation.
     *
     * @returns {BC}
     */
  toRaw() {
    return BC.concat(
      this.bcFromInt(ChangeKey.OPTYPE, 4),
      this.bcFromInt(this[P_ACCOUNT_SIGNER].account, 4),
      this.bcFromInt(this.nOperation, 4),
      this.bcFromInt(this.fee.toMolina(), 8),
      this.bcFromBcWithSize(this.payload),
      PublicKey.empty().encode(),
      this.bcFromInt(this[P_NEW_PUBLIC_KEY].encode().length, 2),
      this[P_NEW_PUBLIC_KEY].encode(),
      this.bcFromSign(this.r, this.s),
    );
  }
}

module.exports = ChangeKey;
