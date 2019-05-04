const Int64 = require('./../Core/Int64');
const PascalCurrency = require('./../../Types/Currency');
const Endian = require('./../../Endian');

/**
 * A special Int64 type that can handle pascalcoin currencies.
 */
class Currency extends Int64 {

  /**
   * Constructor.
   *
   * @param {String} id
   */
  constructor(id = null) {
    super(id || 'currency', false, Endian.LITTLE_ENDIAN);
    this.description('A type for currency values.');
  }

  /**
   * Gets the type description.
   *
   * @returns {{extra: {}, name: string}}
   */
  get typeInfo() {
    let info = super.typeInfo;

    info.name = 'Currency';
    info.hierarchy.push(info.name);
    return info;
  }

  /**
   * Reads the pascal currency value from the given BC.
   *
   * @param {BC} bc
   * @returns {PascalCurrency}
   */
  decodeFromBytes(bc) {
    return PascalCurrency.fromMolina(super.decodeFromBytes(bc));
  }

  /**
   * Appends the given currency value to the given BC.
   *
   * @param {PascalCurrency} value
   */
  encodeToBytes(value) {
    return super.encodeToBytes(value.bn);
  }
  /**
   * Gets the description of the currents type instance.
   *
   * @param {*|null} value
   * @return {{id: String, type: {extra: {}, name: string}, encodedSize: Number}}
   */
  describe(value) {
    return super.describe(value);
  }

}

module.exports = Currency;
