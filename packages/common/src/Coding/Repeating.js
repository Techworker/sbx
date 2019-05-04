/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const BC = require('./../BC');
const CompositeType = require('./CompositeType');

const P_SIZE_ENCODED = Symbol('size_encoded');
const P_REPEAT_LIMIT = Symbol('repeat_limit');

/**
 * A Type that itself is made up of multiple other types.
 */
class Repeating extends CompositeType {
  /**
   * Constructor
   */
  constructor(id, repeatLimit = -1) {
    super(id || 'repeating');
    super.description('A type that itself has one repeating type that will be written / read until the limit is reached or data is empty.');
    this[P_REPEAT_LIMIT] = repeatLimit;
  }

  /**
   * Gets the size of the field type (only available after encoding).
   *
   * @return {*}
   */
  get encodedSize() {
    return this[P_SIZE_ENCODED];
  }

  /**
   * Gets the type description.
   *
   * @returns {{extra: {}, name: string}}
   */
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

    do {
      const decoded = this.subTypes[0].decodeFromBytes(bc.slice(offset);
      result.push(decoded);
      offset += this.subTypes[0].encodedSize;
    } while(offset > bc.length - 1);

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
    let localSubTypes = [];

    localSubTypes.push(this.subTypes[0]);
    localSubTypes.forEach((subType, idx) => {
      let subTypeValue;

      if (subType.hasFixedValue) {
        subTypeValue = subType.fixedValue;
      } else {
        subTypeValue = Array.isArray(objOrArray) ? objOrArray[idx] : objOrArray[idx === 0 ? subType.id : this[P_RESOLVED_FIELD_ID]];
      }

      // we will use the first available
      bc = bc.append(subType.encodeToBytes(subTypeValue));

      // append other resolved subtype
      if (idx === 0) {
        localSubTypes.push(this[P_SUBTYPE_RESOLVER](subTypeValue));
      }
    });

    this[P_SIZE_ENCODED] = bc.length;
    return bc;
  }

  /**
   * Describes the current composite type instance.
   *
   * @param {*} value
   * @return {Object}
   */
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

module.exports = Decissive;
