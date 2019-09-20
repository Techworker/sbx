/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const BC = require('./../BC');
const AbstractType = require('./AbstractType');

const P_SIZE_ENCODED = Symbol('size_encoded');
const P_REPEAT_LIMIT = Symbol('repeat_limit');
const P_REPEAT_MARKER = Symbol('repeat_marker');
const P_TYPE = Symbol('type');

/**
 * A Type that itself is made up of multiple other types.
 */
class Repeating extends AbstractType {
  /**
   * Constructor
   */
  constructor(id, type, repeatLimit = -1, repeatMarker = null) {
    super(id || 'repeating');
    super.description('A type that itself has one repeating type that will ' +
      'be written / read until the limit is reached or data is empty.');
    this[P_TYPE] = type;
    this[P_REPEAT_LIMIT] = repeatLimit;
    this[P_REPEAT_MARKER] = repeatMarker;
  }

  /**
   * @inheritDoc AbstractType#encodedSize
   */
  get encodedSize() {
    return this[P_SIZE_ENCODED];
  }

  /**
   * Decodes the given bytes into an object.
   *
   * @param {BC|Buffer|Uint8Array|String} bc
   * @return {Object}
   */
  decodeFromBytes(bc, options = {}, all = null) {
    let result = [];
    let offset = 0;

    bc = BC.from(bc);

    let limit = this[P_REPEAT_MARKER] !== null ? all[this[P_REPEAT_MARKER]] : this[P_REPEAT_LIMIT];
    let counter = limit;

    while ((limit > -1 && counter > 0) || (limit === -1 && bc.length > offset)) {
      const decoded = this[P_TYPE].decodeFromBytes(bc.slice(offset));

      result.push(decoded);
      offset += this[P_TYPE].encodedSize;
      counter--;
    }

    this[P_SIZE_ENCODED] = offset;

    return result;
  }

  /**
   * Encodes the given object to a list of bytes.
   *
   * @param {Object|Array} objOrArray
   * @returns {BC}
   */
  encodeToBytes(arr) {
    arr = this.determineValue(arr);
    let bc = BC.empty();

    arr.forEach((item, idx) => {
      if (idx >= this[P_REPEAT_LIMIT] && this[P_REPEAT_LIMIT] > -1) {
        return;
      }
      bc = bc.append(this[P_TYPE].encodeToBytes(item));
    });

    this[P_SIZE_ENCODED] = bc.length;
    return bc;
  }

  /**
   * Gets the coder used for each repeated value.
   *
   * @return {*}
   */
  get repeatingType() {
    return this[P_TYPE];
  }
}

module.exports = Repeating;
