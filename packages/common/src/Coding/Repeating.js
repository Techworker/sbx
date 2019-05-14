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
const P_TYPE = Symbol('type');

/**
 * A Type that itself is made up of multiple other types.
 */
class Repeating extends AbstractType {
  /**
   * Constructor
   */
  constructor(id, type, repeatLimit = -1) {
    super(id || 'repeating');
    super.description('A type that itself has one repeating type that will ' +
      'be written / read until the limit is reached or data is empty.');
    this[P_TYPE] = type;
    this[P_REPEAT_LIMIT] = repeatLimit;
  }

  /**
   * @inheritDoc AbstractType#encodedSize
   */
  get encodedSize() {
    return this[P_SIZE_ENCODED];
  }

  /**
   * @inheritDoc AbstractType#typeInfo
   */
  /* istanbul ignore next */
  get typeInfo() {
    let info = super.typeInfo;

    info.name = 'Repeating';
    info.hierarchy.push(info.name);
    return info;
  }

  /**
   * Decodes the given bytes into an object.
   *
   * @param {BC|Buffer|Uint8Array|String} bc
   * @return {Object}
   */
  decodeFromBytes(bc) {
    let result = [];
    let offset = 0;

    bc = BC.from(bc);

    let counter = 0;
    let limitArrived = false;

    do {
      const decoded = this[P_TYPE].decodeFromBytes(bc.slice(offset));

      result.push(decoded);
      offset += this[P_TYPE].encodedSize;
      counter++;
      limitArrived = (this[P_REPEAT_LIMIT] > -1 && this[P_REPEAT_LIMIT] === counter);

    } while (offset < bc.length && !limitArrived);

    return result;
  }

  /**
   * Encodes the given object to a list of bytes.
   *
   * @param {Object|Array} objOrArray
   * @returns {BC}
   */
  encodeToBytes(arr) {
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
   * @inheritDoc AbstractType#describe
   */
  /* istanbul ignore next */
  describe(value) {
    let description = super.describe(value);

    if (arguments.length > 0) {
      description.decoded = this.decodeFromBytes(this.encodeToBytes(value));
      description.encoded = this.encodeToBytes(value).toHex();
      description.encodedSize = description.encoded.length;
    }

    description.subTypes = [];

    this.subTypes.forEach((subType) => {
      let subTypeValue;

      if (subType.hasFixedValue) {
        subTypeValue = subType.fixedValue;
      } else {
        subTypeValue = value[subType.id];
      }

      description.subTypes.push(subType.describe(subTypeValue));
    });

    return description;
  }
}

module.exports = Repeating;
