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
const AccountName = require('@pascalcoin-sbx/common').Types.AccountName;

const P_ACCOUNT_SIGNER = Symbol('account_signer');
const P_ACCOUNT_TARGET = Symbol('account_target');
const P_NEW_PUBLIC_KEY = Symbol('new_public_key');
const P_NEW_NAME = Symbol('new_name');
const P_NEW_TYPE = Symbol('new_type');

const P_WITH_NEW_PUBKEY = Symbol('with_new_pubkey');
const P_WITH_NEW_NAME = Symbol('with_new_name');
const P_WITH_NEW_TYPE = Symbol('with_new_type');

/**
 * Gets the change type of the op.
 *
 * @param {ChangeAccountInfo} op
 * @returns {number}
 */
function getChangeType(op) {
  let changeType = 0;

  if (op[P_WITH_NEW_PUBKEY] === true) {
    changeType |= 1;
  }
  if (op[P_WITH_NEW_NAME] === true) {
    changeType |= 2;
  }
  if (op[P_WITH_NEW_TYPE] === true) {
    changeType |= 4;
  }

  return changeType;
}

/**
 * A transaction object that can be signed.
 */
class ChangeAccountInfo extends Abstract {
  /**
     * Gets the optype.
     *
     * @returns {number}
     */
  static get OPTYPE() {
    return 8;
  }

  /**
     * Constructor.
     *
     * @param {Account|AccountNumber|Number|String} accountSigner
     * @param {Account|AccountNumber|Number|String} accountTarget
     */
  constructor(accountSigner, accountTarget) {
    super();
    this[P_ACCOUNT_SIGNER] = new AccountNumber(accountSigner);
    this[P_ACCOUNT_TARGET] = new AccountNumber(accountTarget);
    this[P_NEW_PUBLIC_KEY] = PublicKey.empty();
    this[P_NEW_NAME] = BC.fromString('');
    // TODO: Im not so sure if this is correct
    this[P_NEW_TYPE] = 0;

    this[P_WITH_NEW_PUBKEY] = false;
    this[P_WITH_NEW_NAME] = false;
    this[P_WITH_NEW_TYPE] = false;
  }

  /**
     * Will set the new public key.
     *
     * @param {PublicKey} publicKey
     * @returns {ChangeAccountInfo}
     */
  withNewPublicKey(publicKey) {
    this[P_NEW_PUBLIC_KEY] = publicKey;
    this[P_WITH_NEW_PUBKEY] = true;
    return this;
  }

  /**
     * Will set the new name of the account.
     *
     * @param {String|AccountName} newName
     * @returns {ChangeAccountInfo}
     */
  withNewName(newName) {
    this[P_NEW_NAME] = new AccountName(newName);
    this[P_WITH_NEW_NAME] = true;
    return this;
  }

  /**
     * Will set the new type of the account.
     *
     * @param {Number} newType
     * @returns {ChangeAccountInfo}
     */
  withNewType(newType) {
    this[P_NEW_TYPE] = newType;
    this[P_WITH_NEW_TYPE] = true;
    return this;
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
      this.bcFromInt(this.fee.toMolina(), 8),
      this.bcFromBcWithSize(this.payload),
      PublicKey.empty().encode(), // v2
      this.bcFromInt(getChangeType(this)),
      this[P_NEW_PUBLIC_KEY].encode(),
      this.bcFromBcWithSize(BC.fromString(this[P_NEW_NAME].toString())),
      this.bcFromInt(this[P_NEW_TYPE], 2),
      this.bcFromInt(ChangeAccountInfo.OPTYPE),
    );
  }

  /**
     * Gets the raw implementation.
     *
     * @returns {BC}
     */
  toRaw() {
    return BC.concat(
      this.bcFromInt(ChangeAccountInfo.OPTYPE, 4),
      this.bcFromInt(this[P_ACCOUNT_SIGNER].account, 4),
      this.bcFromInt(this[P_ACCOUNT_TARGET].account, 4),
      this.bcFromInt(this.nOperation, 4),
      this.bcFromInt(this.fee.toMolina(), 8),
      this.bcFromBcWithSize(this.payload),
      PublicKey.empty().encode(), // v2
      this.bcFromInt(getChangeType(this)),
      this[P_NEW_PUBLIC_KEY].encode(),
      this.bcFromBcWithSize(BC.fromString(this[P_NEW_NAME].toString())),
      this.bcFromInt(this[P_NEW_TYPE], 2),
      this.bcFromSign(this.r, this.s),
    );
  }
}

module.exports = ChangeAccountInfo;
