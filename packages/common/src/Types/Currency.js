/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const BigNumber = require('bignumber.js');

const P_VALUE = Symbol('value');

/**
 * A simple wrapper around bignumber for the pascal currency and
 * basic math functions.
 */
class Currency {
  static get MIN_FEE() {
    return new Currency('0.0001');
  }

  /**
     * Creates a new Currency instance.
     *
     * @param {Number|String|BigNumber|Currency} value
     */
  constructor(value) {
    let pasc = value;

    if (pasc instanceof Currency) {
      this[P_VALUE] = pasc.value;
      return;
    }

    if (typeof pasc === 'string') {
      pasc = pasc.split(',').join('');
    }

    this[P_VALUE] = new BigNumber(pasc.toString());
  }

  static fromMolina(molina) {
    return new Currency(
      new BigNumber(molina.toString()).dividedBy('10000')
    );
  }

  /**
     * Gets the BigNumber instance.
     *
     * @returns {BigNumber}
     */
  get value() {
    return this[P_VALUE];
  }

  /**
     * Gets the pascal value as a string.
     *
     * @returns {string}
     */
  toString() {
    return this[P_VALUE].toFixed(4);
  }

  /**
   * Gets a value indicating that the current value has more decimals than
   * allowed.
   */
  isVague() {
    return this.toStringOpt(5) !== this.toStringOpt(4);
  }

  /**
   * Gets an optimized pascal value with less zeros as possible.
   *
   * @returns {string}
   */
  toStringOpt(decimals = 4) {
    return this[P_VALUE].toFixed(decimals)
      .replace(new RegExp('[0]+$'), '')
      .replace(new RegExp('[\.]+$'), '');
  }

  /**
     * Gets the pascal value as a string.
     *
     * @returns {Number}
     */
  toMolina() {
    return parseFloat(this[P_VALUE].toString()) * 10000;
  }

  /**
     * Adds the given value to the current value and returns a **new**
     * value.
     *
     * @param {Number|String|BigNumber|Currency} addValue
     * @returns {Currency}
     */
  add(addValue) {
    return new Currency(
      this.value.plus(new Currency(addValue).value).toFixed(4),
    );
  }

  /**
     * Subtracts the given value from the current value and returns a
     * **new** value.
     *
     * @param {Currency} subValue
     * @returns {Currency}
     */
  sub(subValue) {
    return new Currency(
      this.value.minus(new Currency(subValue).value).toFixed(4),
    );
  }

  /**
     * Gets a positive variant of the value. If the value is already
     * positive, the current instance will be returned, else a new
     * instance.
     *
     * @returns {Currency}
     */
  toPositive() {
    if (!this[P_VALUE].isPositive()) {
      return new Currency(
        this[P_VALUE].multipliedBy(-1).toFixed(4),
      );
    }

    return this;
  }

  /**
   * Gets a value indicating whether the given value is equal to the current
   * value.
   *
   * @param {Number|String|BigNumber|Currency} value
   * @returns {boolean}
   */
  eq(value) {
    return this[P_VALUE].isEqualTo(new Currency(value).value);
  }

  /**
   * Gets a value indicating whether the given value is greater than the current
   * value.
   *
   * @param {Number|String|BigNumber|Currency} value
   * @returns {boolean}
   */
  gt(value) {
    return this[P_VALUE].isGreaterThan(new Currency(value).value);
  }

  /**
   * Gets a value indicating whether the given value is lower than the current
   * value.
   *
   * @param {Number|String|BigNumber|Currency} value
   * @returns {boolean}
   */
  lt(value) {
    return this[P_VALUE].isLessThan(new Currency(value).value);
  }

  /**
   * Gets a value indicating whether the given value is lower or equal to the
   * current value.
   *
   * @param {Number|String|BigNumber|Currency} value
   * @returns {boolean}
   */
  lteq(value) {
    return this[P_VALUE].isLessThanOrEqualTo(new Currency(value).value);
  }

  /**
   * Gets a value indicating whether the given value is greater or equal to the
   * current value.
   *
   * @param {Number|String|BigNumber|Currency} value
   * @returns {boolean}
   */
  gteq(value) {
    return this[P_VALUE].isGreaterThanOrEqualTo(new Currency(value).value);
  }

  /**
     * Gets the serialized version of this instance.
     *
     * @returns {Object}
     */
  serialize() {
    return {
      pascal: this.toStringOpt(),
      molina: this.toMolina()
    };
  }
}

module.exports = Currency;
