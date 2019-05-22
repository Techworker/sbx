/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const BC = require('../BC');
const AccountNumber = require('./AccountNumber');

const P_BLOCK = Symbol('block');
const P_ACCOUNT = Symbol('account');
const P_N_OPERATION = Symbol('nOperation');
const P_MD160 = Symbol('md160');

/**
 * Holds information about an operation hash.
 */
class OperationHash {
  /**
   * Constructor
   *
   * @param {Number} block
   * @param {Number} account
   * @param {Number} nOperation
   * @param {BC|Buffer|Uint8Array|String} md160
   */
  constructor(block, account, nOperation, md160) {
    this[P_BLOCK] = block;
    this[P_ACCOUNT] = new AccountNumber(account);
    this[P_N_OPERATION] = nOperation;
    this[P_MD160] = BC.from(md160);

    if (this[P_MD160].length !== 20) {
      throw new Error('Invalid operation hash - md160 size !== 20 bytes.');
    }
  }

  /**
   * Gets the account that executed the operation.
   *
   * @returns {AccountNumber}
   */
  get account() {
    return this[P_ACCOUNT];
  }

  /**
   * Gets the block number.
   *
   * @returns {Number}
   */
  get block() {
    return this[P_BLOCK];
  }

  /**
   * Gets the number of operations for the executing account.
   *
   * @returns {Number}
   */
  get nOperation() {
    return this[P_N_OPERATION];
  }

  /**
   * Gets the md160 of the op.
   *
   * @returns {BC}
   */
  get md160() {
    return this[P_MD160];
  }

  /**
   * Gets a value indicating whether the given ophash equals the current ophash.
   *
   * @param opHash
   * @param ignoreBlock
   * @return {boolean}
   */
  equals(opHash, ignoreBlock = false) {
    let blockResult = true;

    if (!ignoreBlock) {
      blockResult = this.block === opHash.block;
    }

    return blockResult &&
      this.nOperation === opHash.nOperation &&
      this.account.account === opHash.account.account &&
      this.md160.equals(opHash.md160);
  }
}

module.exports = OperationHash;
