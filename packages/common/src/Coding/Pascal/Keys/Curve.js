const PascalCurve = require('./../../../Types/Keys/Curve');
const Endian = require('./../../../Endian');
const Int16 = require('./../../Core/Int16');

/**
 * A special Int64 type that can handle pascalcoin currencies.
 */
class Curve extends Int16 {

  /**
   * Constructor.
   *
   * @param {String} id
   */
  constructor(id = null) {
    super(id || 'curve', true, Endian.LITTLE_ENDIAN);
    this.description('Key curve id');
  }

  /**
   * @inheritDoc AbstractType#typeInfo
   */
  /* istanbul ignore next */
  get typeInfo() {
    let info = super.typeInfo;

    info.name = 'Curve';
    info.hierarchy.push(info.name);
    return info;
  }

  /**
   * Reads the pascal currency value from the given BC.
   *
   * @param {BC} bc
   * @returns {PascalCurve}
   */
  decodeFromBytes(bc) {
    return new PascalCurve(super.decodeFromBytes(bc));
  }

  /**
   * Appends the given currency value to the given BC.
   *
   * @param {PascalCurve} value
   */
  encodeToBytes(value) {
    return super.encodeToBytes(value.id);
  }
}

module.exports = Curve;
