const P_ID = Symbol('id');
const P_FIXED_VALUE = Symbol('fixed_value');
const P_HAS_FIXED_VALUE = Symbol('has_fixed_value');
const P_DESCRIPTION = Symbol('description');

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
   * @inheritDoc AbstractType#typeInfo
   */
  /* istanbul ignore next */
  get typeInfo() {
    return {
      name: 'AbstractType',
      description: this.description(),
      extra: {},
      hierarchy: ['AbstractType']
    };
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
   * @param {BC} bc
   */
  decodeFromBytes(bc) {
    throw new Error('Missing implementation for decodeFromBytes.');
  }

  /**
   * Returns the encoded bytes for the given value.
   *
   * @param {*} value
   */
  encodeToBytes(value) {
    throw new Error('Missing implementation for encodeToBytes.');
  }

  /**
   * Describes the type.
   *
   * @param {*} value
   */
  /* istanbul ignore next */
  describe(value) {
    let description = {
      id: this.id,
      type: this.typeInfo
    };

    if (this.hasFixedValue) {
      description.fixed = this.fixedValue;
    }

    return description;
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
   * Sets the description and returns the type or gets the description itself.
   *
   * @param {String} description
   * @returns {AbstractType|String}
   */
  description(description = null) {
    if (description === null) {
      return this[P_DESCRIPTION];
    }

    this[P_DESCRIPTION] = description;
    return this;
  }
}

module.exports = AbstractType;
