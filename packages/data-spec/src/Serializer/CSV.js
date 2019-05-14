/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const Util = require('@pascalcoin-sbx/common').Util;

const P_DELIMITER = Symbol('delimiter');
const P_ENCLOSURE = Symbol('enclosure');
const P_ESCAPE_CHAR = Symbol('escape_char');

function escape(str, enclosure, escapeChar) {
  return str.replace(new RegExp(Util.escapeRegex(enclosure), 'g'), escapeChar + enclosure);
}

/**
 * A simple CSV serializer and deserializer.
 */
class CSV {
  /**
   * Constructor
   *
   * @param {String} delimiter
   * @param {String} enclosure
   * @param {String} escapeChar
   */
  constructor(delimiter = ',', enclosure = '"', escapeChar = '\\') {
    this[P_DELIMITER] = delimiter;
    this[P_ENCLOSURE] = enclosure;
    this[P_ESCAPE_CHAR] = escapeChar;
  }

  /**
   * Serializes the given data.
   *
   * @param {Object|Array} data
   * @param {Boolean} withKeys
   * @param {String} withKeysDelim
   * @returns {string}
   */
  serialize(data, withKeys = false, withKeysDelim = ':') {
    let r = '';

    const keys = Object.keys(data);

    // loop data and add values to resulting csv
    keys.forEach((key, idx) => {
      let valEsc = escape(data[key], this[P_ENCLOSURE], this[P_ESCAPE_CHAR]);

      // prepend key and delim
      if (withKeys) {
        let keyEsc = escape(key, this[P_ENCLOSURE], this[P_ESCAPE_CHAR]);

        r += `${this[P_ENCLOSURE]}${keyEsc}${withKeysDelim}${valEsc}${this[P_ENCLOSURE]}`;
      } else {
        r += `${this[P_ENCLOSURE]}${valEsc}${this[P_ENCLOSURE]}`;
      }
      if (idx < keys.length - 1) {
        r += this[P_DELIMITER];
      }
    });

    return r;
  }

  /**
   * Parses the given csv string and returns an object or an array with the results.
   *
   * @param {String} csv
   * @param {Boolean} withKeys
   * @param {String} withKeysDelim
   * @returns {Array|Object}
   */
  deserialize(csv, withKeys = false, withKeysDelim = ':') {
    const state = {
      inValue: false
    };
    let result = [];

    if (withKeys === true) {
      result = {};
    }
    let curr = '';

    const addCurr = () => {
      if (withKeys) {
        result[curr.split(withKeysDelim)[0]] = curr.split(withKeysDelim)[1];
      } else {
        result.push(curr);
      }
    };

    // loop the csv string
    for (let i = 0; i < csv.length; i++) {
      const c = csv.charAt(i);
      const cb = i > 0 ? csv.charAt(i - 1) : false;

      // check if its an enclosure
      if (c === this[P_ENCLOSURE] && !state.inValue) {
        state.inValue = true;
        continue;
      }
      if (c === this[P_ENCLOSURE] && cb !== this[P_ESCAPE_CHAR] && state.inValue) {
        state.inValue = false;
        addCurr();
        curr = '';
        continue;
      }

      // handle no enclosure
      if (this[P_ENCLOSURE] === '') {
        // we are always "in" a value, except we find a delimiter
        state.inValue = true;
        if (c === this[P_DELIMITER]) {
          addCurr();
          curr = '';
          continue;
        }
      }

      if (state.inValue) {
        if (cb === this[P_ESCAPE_CHAR]) {
          curr = curr.substr(0, curr.length - this[P_ESCAPE_CHAR].length);
        }
        curr += c;
      }
    }

    if (curr !== '') {
      addCurr();
    }

    return result;
  }
}

module.exports = CSV;
