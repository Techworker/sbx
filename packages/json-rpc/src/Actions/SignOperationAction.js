/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const OperationAction = require('./OperationAction');
const BC = require('@pascalcoin-sbx/common').BC;

/**
 * This object derives from an operation action and extends the functionality
 * by methods shared by cold wallet signing operations.
 */
class SignOperationAction extends OperationAction {
  /**
   * Constructor.
   *
   * @param {String} method
   * @param {Object} params
   * @param {Executor} executor
   * @param {*} DestinationType
   * @param {Boolean} returnsArray
   */
  constructor(method, params, executor, DestinationType, returnsArray) {
    super(method, params, executor, DestinationType, returnsArray);
    this.params.last_n_operation = null;
    this.params.rawoperations = null;
  }

  /**
     * Sets the last n operation value.
     *
     * @param {Number} lastNOperation
     * @return {SignOperationAction}
     */
  withLastNOperation(lastNOperation) {
    this.params.last_n_operation = lastNOperation;
    return this;
  }

  /**
     * Sets the raw operations instance of a previous result.
     *
     * @param {BC|String} rawoperations
     * @return {SignOperationAction}
     */
  withRawOperations(rawoperations) {
    this.params.rawoperations = BC.from(rawoperations);
  }

  isValid() {
    return super.isValid() && this.params.last_n_operation !== null;
  }
}

module.exports = SignOperationAction;
