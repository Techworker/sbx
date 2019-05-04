/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const BN = require('bn.js');

const P_VALUE = Symbol('value');

function toFixed(x) {
  let base = new BN(10).pow(new BN(4));
  let dm = x.divmod(base);

  let mod = dm.mod.toString(10, 4);
  let m = dm.div.toString();

  let isNegative = false;

  if (x.toString().substr(0, 1) === '-') {
    if (m.substr(0, 1) === '-') {
      m = m.substr(1);
    }
    if (mod.substr(0, 1) === '-') {
      mod = mod.substr(1);
    }
    isNegative = true;
  }

  return `${isNegative ? '-' : ''}${m}.${mod}`;
}

/**
 * A simple wrapper around bignumber for the pascal currency and
 * basic math functions.
 */
class Currency {
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

    if (BN.isBN(pasc)) {
      this[P_VALUE] = pasc;
      return;
    }

    pasc = pasc.toString();
    pasc = pasc.split(',').join(''); // remove commas
    // now split the '.'

    const ten = new BN(10);
    const base = ten.pow(new BN(4));

    // Is it negative?
    let negative = (pasc.substring(0, 1) === '-');

    if (negative) {
      pasc = pasc.substring(1);
    }

    if (pasc === '.') {
      throw new Error(
        `Invalid value ${pasc} cannot be converted to` +
          ' base unit with 4 decimals.');
    }

    // Split it into a whole and fractional part
    let comps = pasc.split('.');

    if (comps.length > 2) { throw new Error('Too many decimal points'); }

    let whole = comps[0], fraction = comps[1];

    if (!whole) { whole = '0'; }
    if (!fraction) { fraction = '0'; }
    if (fraction.length > 4) {
      throw new Error('Too many decimal places');
    }

    while (fraction.length < 4) {
      fraction += '0';
    }

    whole = new BN(whole);
    fraction = new BN(fraction);
    let molina = (whole.mul(base)).add(fraction);

    if (negative) {
      molina = molina.neg();
    }

    this[P_VALUE] = new BN(molina.toString(10), 10);
  }

  static fromMolina(molina) {
    return new Currency(
      new BN(molina.toString())
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
    return toFixed(this[P_VALUE]);
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
    return toFixed(this[P_VALUE])
      .replace(new RegExp('[0]+$'), '')
      .replace(new RegExp('[\.]+$'), '');
  }

  /**
     * Gets the pascal value as a string.
     *
     * @returns {Number}
     */
  toMolina() {
    return this[P_VALUE].toString();
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
      this.value.add(new Currency(addValue).value),
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
      this.value.sub(new Currency(subValue).value)
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
    if (this[P_VALUE].isNeg() === true) {
      return new Currency(
        this[P_VALUE].neg(),
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
    return this[P_VALUE].eq(new Currency(value).value);
  }

  /**
   * Gets a value indicating whether the given value is greater than the current
   * value.
   *
   * @param {Number|String|BigNumber|Currency} value
   * @returns {boolean}
   */
  gt(value) {
    return this[P_VALUE].gt(new Currency(value).value);
  }

  /**
   * Gets a value indicating whether the given value is lower than the current
   * value.
   *
   * @param {Number|String|BigNumber|Currency} value
   * @returns {boolean}
   */
  lt(value) {
    return this[P_VALUE].lt(new Currency(value).value);
  }

  /**
   * Gets a value indicating whether the given value is lower or equal to the
   * current value.
   *
   * @param {Number|String|BigNumber|Currency} value
   * @returns {boolean}
   */
  lteq(value) {
    return this[P_VALUE].lte(new Currency(value).value);
  }

  /**
   * Gets a value indicating whether the given value is greater or equal to the
   * current value.
   *
   * @param {Number|String|BigNumber|Currency} value
   * @returns {boolean}
   */
  gteq(value) {
    return this[P_VALUE].gte(new Currency(value).value);
  }

  get bn() {
    return this[P_VALUE];
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
