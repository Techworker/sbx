/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const P_PARAMS = Symbol('params');
const P_METHOD = Symbol('method');
const P_EXECUTOR = Symbol('executor');
const P_DESTINATION_TYPE = Symbol('destination_type');
const P_RETURNS_ARRAY = Symbol('returns_array');

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
   * @param {*} DestinationType
   * @param {Boolean} returnsArray
   */
  constructor(method, params, executor, DestinationType, returnsArray) {
    this[P_METHOD] = method;
    this[P_PARAMS] = params;
    this[P_EXECUTOR] = executor;
    this[P_DESTINATION_TYPE] = DestinationType;
    this[P_RETURNS_ARRAY] = returnsArray;
  }

  /**
   * Gets the destination type.
   *
   * @returns {*}
   */
  get destinationType() {
    return this[P_DESTINATION_TYPE];
  }

  /**
   * Gets a value indicating whether the action returns an array.
   *
   * @returns {Boolean}
   */
  get returnsArray() {
    return this[P_RETURNS_ARRAY];
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

  get destinationType() {
    return this[P_DESTINATION_TYPE];
  }

  get returnsArray() {
    return this[P_RETURNS_ARRAY];
  }

  /**
     * Executes the current action and returns the raw result.
     *
     * @returns {Promise}
     */
  async execute() {
    return this[P_EXECUTOR].execute(this);
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
