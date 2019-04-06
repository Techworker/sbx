/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const P_PARAMS = Symbol('params');
const P_METHOD = Symbol('method');
const P_EXECUTOR = Symbol('executor');

/**
 * A basic action that holds the rpc method and its parameters.
 */
class BaseAction {
  /**
     * Constructor.
     *
     * @param {String} method
     * @param {Object} params
     * @param {Executor} executor
     */
  constructor(method, params, executor) {
    this[P_METHOD] = method;
    this[P_PARAMS] = params;
    this[P_EXECUTOR] = executor;
  }

  /**
     * Gets the params for the rpc call.
     *
   * @returns {Object}
     */
  get params() {
    return this[P_PARAMS];
  }

  /**
   * Changes a single param of the params object.
   *
   * @param {String} name
   * @param {*} value
   * @returns {BaseAction}
   */
  changeParam(name, value) {
    this[P_PARAMS][name] = value;
    return this;
  }

  /**
     * Gets the method.
     *
     * @returns {*}
     */
  get method() {
    return this[P_METHOD];
  }

  /**
     * Executes the current action and returns the raw result.
     *
     * @returns {Promise}
     */
  async execute() {
    return this[P_EXECUTOR].execute(this[P_METHOD], this[P_PARAMS]);
  }

  /**
   * Executes the current action and transforms the result to an array
   *  of the defined type.
   *
   *  @param {Object} destinationType
   * @returns {Promise}
   */
  async executeTransformArray(destinationType) {
    return this[P_EXECUTOR].executeTransformArray(
      this[P_METHOD], this[P_PARAMS], destinationType,
    );
  }

  /**
     * Executes the current action and transforms the result to an object
     *  of the defined type.
     *
     *  @param {Object} destinationType
     * @returns {Promise}
     */
  async executeTransformItem(destinationType) {
    return this[P_EXECUTOR].executeTransformItem(
      this[P_METHOD], this[P_PARAMS], destinationType,
    );
  }

  /**
     * Gets a flag indicating whether the current action is valid.
     *
     * @returns {boolean}
     */
  isValid() {
    return true;
  }
}

module.exports = BaseAction;
