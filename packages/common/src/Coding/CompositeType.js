/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const BC = require('./../BC');
const AbstractType = require('./AbstractType');

const P_SUBTYPES = Symbol('subtypes');
const P_SIZE_ENCODED = Symbol('size_encoded');

/**
 * A Type that itself is made up of multiple other types.
 */
class CompositeType extends AbstractType {
  /**
   * Constructor
   */
  constructor(id) {
    super(id || 'composite_type');
    super.description('A type that itself is made up of multiple other types.');
    this[P_SUBTYPES] = [];
  }

  /**
   * Gets the config for all fields.
   *
   * @returns {Array}
   */
  get subTypes() {
    return this[P_SUBTYPES];
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

    info.name = 'CompositeType';
    info.hierarchy.push(info.name);
    return info;
  }

  /**
   * Adds a new field (type) definition.
   *
   * @param {AbstractType} field
   */
  addSubType(field) {
    this[P_SUBTYPES].push(field);
  }

  clearSubTypes() {
    this[P_SUBTYPES] = [];
  }

  /**
   * Decodes the given bytes into an object.
   *
   * @param {BC|Buffer|Uint8Array|String} bc
   * @param {Boolean} toArray
   * @return {Object}
   */
  decodeFromBytes(bc, toArray = false) {
    const obj = {};
    let offset = 0;

    bc = BC.from(bc);

    this.subTypes.forEach((subType) => {
      obj[subType.id] = subType.decodeFromBytes(bc.slice(offset));
      offset += subType.encodedSize;
    });

    return toArray ? Object.values(obj) : obj;
  }

  /**
   * Encodes the given object to a list of bytes.
   *
   * @param {Object|Array} objOrArray
   * @returns {BC}
   */
  encodeToBytes(objOrArray) {
    let bc = BC.empty();

    this.subTypes.forEach((subType, idx) => {
      let subTypeValue;

      if (subType.hasFixedValue) {
        subTypeValue = subType.fixedValue;
      } else {
        subTypeValue = Array.isArray(objOrArray) ? objOrArray[idx] : objOrArray[subType.id];
      }

      // we will use the first available
      bc = bc.append(subType.encodeToBytes(subTypeValue));
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

module.exports = CompositeType;
