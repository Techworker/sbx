/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const Endian = require('./../../Endian');
const CompositeType = require('./../CompositeType');
const Int32 = require('./../Core/Int32');
const AccountNumber = require('./AccountNumber');
const BytesWithFixedLength = require('./../Core/BytesFixedLength');
const NOperation = require('./NOperation');
const OperationHashType = require('./../../Types/OperationHash');

/**
 * Simple wrapper for an unsigned Int32 value (used for the n_operation value)
 */
class OperationHash extends CompositeType {

  /**
   * Constructor.
   *
   * @param {String} id
   */
  constructor(id = null) {
    super(id || 'ophash');
    this.description('A pascalCoin operation hash');

    this.addSubType(
      new Int32('block', true, Endian.LITTLE_ENDIAN)
        .description('The block the operation is in.')
    );
    this.addSubType(
      new AccountNumber('account')
        .description('The account number that signed the operation.')
    );
    this.addSubType(
      new NOperation('nOperation', 4)
        .description('The n_operation value of the account with the current operation.')
    );
    this.addSubType(
      new BytesWithFixedLength('md160', 20)
        .description('The RIPEMD160 hash of the operation data.')
    );
  }

  /**
   * Reads a value and returns a new PascalCoin AccountNumber instance.
   *
   * @param {BC|Buffer|Uint8Array|String} bc
   * @param {Object} options
   * @param {*} all
   * @returns {OperationHash}
   */
  decodeFromBytes(bc, options = {}, all = null) {
    const decoded = super.decodeFromBytes(bc);

    return new OperationHashType(decoded.block, decoded.account, decoded.nOperation, decoded.md160);
  }

  /**
   * Appends the given pascalcoin account number to the BC.
   *
   * @param {OperationHash} value
   * @return {BC}
   */
  encodeToBytes(value) {
    value = this.determineValue(value);
    return super.encodeToBytes(value);
  }
}

module.exports = OperationHash;
