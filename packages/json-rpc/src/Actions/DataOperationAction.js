/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const OperationAction = require('./OperationAction');
const PascalInfo = require('@pascalcoin-sbx/common').PascalInfo;
const Currency = require('@pascalcoin-sbx/common').Types.Currency;

/**
 * An object that holds infos about an operation action. It extends the
 * BaseAction functionality by methods which are useful for operations.
 */
class DataOperationAction extends OperationAction {
  /**
   * Constructor
   *
   * @param {String} method
   * @param {Object} params
   * @param {Executor} executor
   * @param {*} DestinationType
   * @param {Boolean} returnsArray
   */
  constructor(method, params, executor, DestinationType, returnsArray) {
    super(method, params, executor, DestinationType, returnsArray);
    this.params.fee = new Currency(0);
    this.params.payload = '';
    this.params.payload_method = 'none';
  }

  /**
   * Sets the sequence
   *
   * @param {Number} sequence
   * @return {DataOperationAction}
   */
  withSequence(sequence) {
    this.params.data_sequence = parseInt(sequence, 10);
    return this;
  }

  /**
   * Sets the type.
   *
   * @param {Number} type
   * @return {DataOperationAction}
   */
  withType(type) {
    this.params.data_type = parseInt(type, 10);
    return this;
  }

  /**
   * Sets the GUID value.
   *
   * @param {GUID} guid
   * @return {DataOperationAction}
   */
  withGuid(guid) {
    this.params.guid = guid;
    return this;
  }
}

module.exports = DataOperationAction;
