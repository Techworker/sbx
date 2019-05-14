/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const P_PRETTY = Symbol('pretty');

/**
 * A serializer from JSON. It simply generates a JSON string from the given
 * value or parses the given json string.
 */
class JSON_ {
  /**
   * Constructor.
   *
   * @param {Boolean} pretty
   */
  constructor(pretty = false) {
    this[P_PRETTY] = !!pretty;
  }

  /**
   * Serializes the given parameter.
   *
   * @param {*} data
   * @returns {string}
   */
  serialize(data) {
    if (this[P_PRETTY]) {
      return JSON.stringify(data, null, 2);
    }
    return JSON.stringify(data);
  }

  /**
   * Deserializes the given json string.
   *
   * @param {String} jsonString
   * @returns {*}
   */
  static deserialize(jsonString) {
    return JSON.parse(jsonString);
  }
}

module.exports = JSON_;
