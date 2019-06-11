/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const P_ID = Symbol('id');
const P_FIXED_VALUE = Symbol('fixed_value');
const P_HAS_FIXED_VALUE = Symbol('has_fixed_value');
const P_DESCRIPTION = Symbol('description');
const P_TARGET_FIELD_NAME = Symbol('target_field_name');
const P_HAS_TARGET_FIELD_NAME = Symbol('has_target_field_name');

/**
 * Abstract field type to encode and decode values. Abstracts encodeToBytes and decodeFromBytes as
 * basic implementations but in fact it can be anything.
 */
class AbstractType {
  /**
   * Constructor.
   *
   * @param {string|null} id
   */
  constructor(id = null) {
    this[P_ID] = id;
    this[P_HAS_FIXED_VALUE] = false;
    this[P_HAS_TARGET_FIELD_NAME] = false;
  }

  /**
   * Gets the field ident.
   *
   * @returns {String}
   */
  get id() {
    return this[P_ID];
  }

  /**
   * Gets a value indicating whether the field type has a fixed value.
   *
   * @returns {Boolean}
   */
  get hasFixedValue() {
    return this[P_HAS_FIXED_VALUE];
  }

  /**
   * Gets the fixed value.
   *
   * @returns {*}
   */
  get fixedValue() {
    return this[P_FIXED_VALUE];
  }

  /**
   * Gets a value indicating whether the field has a different target field name.
   *
   * @returns {Boolean}
   */
  get hasTargetFieldName() {
    return this[P_HAS_TARGET_FIELD_NAME];
  }

  /**
   * Gets the target field name.
   *
   * @returns {string}
   */
  get targetFieldName() {
    return this[P_TARGET_FIELD_NAME];
  }

  /**
   * Gets the encoded size of the type.
   *
   * @return {Number}
   */
  get encodedSize() {
    throw new Error('Encoded size getter not implemented');
  }

  /**
   * Decodes a value using the rules defined in the method from the given bytes.
   *
   * @param {BC|Buffer|Uint8Array|String} bc
   * @param {Object} options
   * @param {*} all
   * @return {*}
   */
  decodeFromBytes(bc, options = {}, all = null) {
    throw new Error('Missing implementation for decodeFromBytes.');
  }

  /**
   * Returns the encoded bytes for the given value.
   *
   * @param {*} value
   * @return {*}
   */
  encodeToBytes(value) {
    throw new Error('Missing implementation for encodeToBytes.');
  }

  /**
   * Sets a fixed value.
   *
   * @param {*} value
   * @returns {AbstractType}
   */
  withFixedValue(value) {
    this[P_FIXED_VALUE] = value;
    this[P_HAS_FIXED_VALUE] = true;
    return this;
  }

  /**
   * Sets a fixed value.
   *
   * @param {string} targetFieldName
   * @returns {AbstractType}
   */
  withTargetFieldName(targetFieldName) {
    this[P_TARGET_FIELD_NAME] = targetFieldName;
    this[P_HAS_TARGET_FIELD_NAME] = true;
    return this;
  }

  /**
   * Sets the description and returns the type or gets the description itself.
   *
   * @param {String} description
   * @returns {AbstractType|String}
   */
  description(description = null) {
    if (description === null) {
      return this[P_DESCRIPTION];
    }

    if (this[P_DESCRIPTION] === undefined) {
      this[P_DESCRIPTION] = [];
    }
    this[P_DESCRIPTION].push(description);
    return this;
  }

  /**
   * Gets a value indicating whether the type can be decoded. It is
   * not possible in some circumstances.
   *
   * @return {boolean}
   */
  get canDecode() {
    return true;
  }
}

module.exports = AbstractType;
