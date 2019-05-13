const AbstractType = require('./../AbstractType');
const Int8 = require('./Int8');
const Int16 = require('./Int16');
const Int32 = require('./Int32');

const StringWithoutLength = require('./StringWithoutLength');
const Endian = require('./../../Endian');

const P_SIZE_ENCODED = Symbol('size_encoded');
const P_LENGTH_FIELD = Symbol('length_field');
const P_BYTES_FIELD = Symbol('bytes_field');

/**
 * A field type to write dynamic strings (prepends the length).
 */
class StringWithLength extends AbstractType {

  constructor(id, byteSize = 1) {
    super(id || `bytes_size${byteSize * 8}`);
    this.description('String with size prepended');
    this[P_BYTES_FIELD] = new StringWithoutLength('value');

    switch (byteSize) {
      case 1:
        this[P_LENGTH_FIELD] = new Int8('length', true);
        break;
      case 2:
        this[P_LENGTH_FIELD] = new Int16('length', true, Endian.LITTLE_ENDIAN);
        break;
      case 4:
        this[P_LENGTH_FIELD] = new Int32('length', true, Endian.LITTLE_ENDIAN);
        break;
      default:
        throw new Error('ByteSize must be either 1, 2 or 4');
    }
  }

  /**
   * @inheritDoc AbstractType#typeInfo
   */
  /* istanbul ignore next */
  get typeInfo() {
    let info = super.typeInfo;

    info.name = 'StringWithLength';
    info.hierarchy.push(info.name);

    return info;
  }

  /**
   * @inheritDoc AbstractType#encodedSize
   */
  get encodedSize() {
    return this[P_SIZE_ENCODED];
  }

  /**
   * Decodes the string value from the given bytes
   *
   * @param {BC} bc
   * @returns {BC}
   */
  decodeFromBytes(bc) {
    this[P_SIZE_ENCODED] = this[P_LENGTH_FIELD].decodeFromBytes(bc);
    return this[P_BYTES_FIELD].decodeFromBytes(
      bc.slice(
        this[P_LENGTH_FIELD].encodedSize,
        this[P_LENGTH_FIELD].encodedSize + this[P_SIZE_ENCODED]
      )
    );
  }

  /**
   * Encodes the given value.
   *
   * @param {BC} value
   * @returns {BC}
   */
  encodeToBytes(value) {
    this[P_SIZE_ENCODED] = value.length;
    let bc = this[P_LENGTH_FIELD].encodeToBytes(this[P_SIZE_ENCODED]);

    return bc.append(this[P_BYTES_FIELD].encodeToBytes(value));
  }

  /**
   * @inheritDoc AbstractType#describe
   */
  /* istanbul ignore next */
  describe(value) {
    let description = super.describe(value);

    if (arguments.length > 0) {
      description.decoded = value;
      description.encoded = this.encodeToBytes(value);
      description.encodedSize = this.encodedSize;
    }

    return description;
  }
}

module.exports = StringWithLength;
