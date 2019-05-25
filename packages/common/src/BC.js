/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const Endian = require('./Endian');

const P_BUFFER = Symbol('buffer');

/**
 * A BC value as defined in PascalCoin. In essence its a wrapper for
 * a buffer.
 */
class BC {
  /**
     * Constructor
     *
   * @param {Buffer|Uint8Array} buffer
     */
  constructor(buffer) {
    this[P_BUFFER] = Buffer.from(buffer);
  }

  /**
   * Gets a BC instance from the given value. If a string it expects it to be
   * in hex format.
   *
   * This method it called everywhere, so we make sure that
   *
   * @param {Buffer|Uint8Array|BC|String} data
   * @param {String} stringType
   * @returns {BC}
   */
  static from(data, stringType = 'hex') {
    if (data instanceof BC) {
      return data;
    } else if (data instanceof Buffer) {
      return new BC(data);
    } else if (data instanceof Uint8Array) {
      return new BC(data);
    }

    if (stringType === 'hex') {
      try {
        return BC.fromHex(data);
      } catch (e) {
        return BC.fromString(data);
      }
    }

    return BC.fromString(data);
  }

  /**
   * Gets an empty BC.
   *
   * @returns {BC}
   */
  static empty() {
    return BC.from([]);
  }

  /**
     * Creates a new BC instance from the given hex string.
     *
   * @param {string} hex
   * @param {Boolean} strict
     * @returns {BC}
     */
  static fromHex(hex, strict = true) {
    if (hex instanceof BC) {
      return hex;
    }

    if (hex.length % 2 === 1) {
      if (strict) {
        throw new Error('Invalid hex - number of nibbles need to be divideable by 2');
      } else {
        hex = `0${hex}`; // eslint-disable-line no-param-reassign
      }
    }

    if (hex.length > 0 && /^[0-9a-fA-F]+$/.test(hex) === false) {
      throw new Error('Invalid hex');
    }

    return new BC(Buffer.from(hex, 'hex'));
  }

  /**
     * Creates a new BC instance from the given string.
     *
     * @param {string} str
     * @returns {BC}
     */
  static fromString(str) {
    if (str instanceof BC) {
      return str;
    }

    // TODO: UTF8?
    return new BC(Buffer.from(str, 'utf8'));
  }

  /**
     * Gets a new BC from an integer.
     *
     * @param {Number} int
     * @param {Number} nBytes
     * @returns {BC}
     */
  static fromInt(int, nBytes = null) {
    let hex = parseInt(int, 10).toString(16);

    const instance = BC.fromHex(hex, false);

    if (nBytes !== null && instance.length < nBytes) {
      return instance.prepend(BC.fromHex('00'.repeat(nBytes - instance.length)));
    }
    return instance;
  }

  /**
     * Gets the binary presentation of the hexa string.
     *
     * @returns {string}
     */
  toBinary() {
    return this[P_BUFFER].toString('binary');
  }

  /**
     * Gets the BC as a string.
     *
     * @returns {string}
     * // TODO: UTF8?
     */
  toString() {
    return this[P_BUFFER].toString('utf8');
  }

  /**
   * Gets the BC as hex.
   *
   * @returns {string}
   */
  toHex(lowerCase = false) {
    if (lowerCase) {
      return this[P_BUFFER].toString('hex').toLowerCase();
    }

    return this[P_BUFFER].toString('hex').toUpperCase();
  }

  /**
     * Gets the integer value of the BC.
     *
     * @return {Number}
     */
  toInt() {
    return parseInt(this.toHex(), 16);
  }

  /**
     * Gets the length of BC bytes.
     *
     * @returns {number}
     */
  get length() {
    return this[P_BUFFER].length;
  }

  /**
     * Gets the length of the parsed BC (the bytes).
     *
     * @returns {number}
     */
  get hexLength() {
    return this.length * 2;
  }

  /**
     * Gets a copy of the current buffer.
     *
     * @returns {Buffer}
     */
  get buffer() {
    return Buffer.from(this[P_BUFFER].toString('hex'), 'hex');
  }

  /**
     * Returns a sub-BC defined by the start and end position.
     *
     * @param {Number}start
     * @param {Number} end
     * @returns {BC}
     */
  slice(start, end = null) {
    if (end === null) {
      return new BC(this[P_BUFFER].slice(start));
    }

    return new BC(this[P_BUFFER].slice(start, end));
  }

  /**
     * Concatenates one or more BC instances and returns a new instance.
     *
     * @param {...BC} bytes
     * @returns {BC}
     */
  static concat(...bytes) {
    return BC.fromHex(bytes.reduce((prev, curr) => {
      if (prev instanceof Object) {
        return `${prev.toHex()}${curr.toHex()}`;
      }
      return `${prev}${curr.toHex()}`;
    }));
  }

  /**
   * Appends a single BC instance to the current BC and
   * returns a new instance.
   *
   * @param {BC|Buffer|Uint8Array|String} bytes
   * @returns {BC}
   */
  append(bytes) {
    return BC.concat(this, BC.from(bytes));
  }

  /**
     * Appends a single BC instance to the current BC and
     * returns a new instance.
     *
     * @param {BC|Buffer|Uint8Array|String} bytes
     * @returns {BC}
     */
  prepend(bytes) {
    return BC.concat(BC.from(bytes), this);
  }

  /**
   * Gets a value indicating the current bc equals the given bc.
   *
   * @param {BC|Buffer|Uint8Array|String} bc
   * @returns {boolean}
   */
  equals(bc) {
    return Buffer.compare(BC.from(bc).buffer, this.buffer) === 0;
  }

  /**
   * Reads an 8 bit integer value from the bc from the given offset.
   *
   * @param {Number} offset
   * @param {Boolean} unsigned
   * @returns {Number}
   */
  readInt8(offset, unsigned = true) {
    return this[P_BUFFER][unsigned ? 'readUInt8' : 'readInt8'](offset);
  }

  /**
   * Reads a 16 bit integer value from the bc from the given offset.
   *
   * @param {Number} offset
   * @param {Boolean} unsigned
   * @param {String} endian
   * @returns {Number}
   */
  readInt16(offset, unsigned = true, endian = Endian.detect()) {
    const method = `read${unsigned ? 'U' : ''}Int16${endian}`;

    return this[P_BUFFER][method](offset);
  }

  /**
   * Reads a 32 bit integer value from the bc from the given offset.
   *
   * @param {Number} offset
   * @param {Boolean} unsigned
   * @param {String} endian
   * @returns {Number}
   */
  readInt32(offset, unsigned = true, endian = Endian.detect()) {
    const method = `read${unsigned ? 'U' : ''}Int32${endian}`;

    return this[P_BUFFER][method](offset);
  }

  /**
   * Creates an 8 bit integer BC.
   *
   * @param {Number} value
   * @param {Boolean} unsigned
   * @returns {BC}
   */
  static fromInt8(value, unsigned = true) {
    const method = `write${unsigned ? 'U' : ''}Int8`;
    const buf = Buffer.allocUnsafe(1);

    buf[method](value);
    return new BC(buf);
  }

  /**
   * Creates a 16 bit integer BC.
   *
   * @param {Number} value
   * @param {Boolean} unsigned
   * @param {String} endian
   * @returns {BC}
   */
  static fromInt16(value, unsigned = true, endian = Endian.detect()) {
    const method = `write${unsigned ? 'U' : ''}Int16${endian}`;
    const buf = Buffer.allocUnsafe(2);

    buf[method](value);
    return new BC(buf);
  }

  /**
   * Creates a 32 bit integer BC.
   *
   * @param {Number} value
   * @param {Boolean} unsigned
   * @param {String} endian
   * @returns {BC}
   */
  static fromInt32(value, unsigned = true, endian = Endian.detect()) {
    const method = `write${unsigned ? 'U' : ''}Int32${endian}`;
    const buf = Buffer.allocUnsafe(4);

    buf[method](value);
    return new BC(buf);
  }

  /**
   * Small helper to split a byte collection.
   *
   * @param {Number} size
   * @return {BC[]}
   */
  split(size) {
    let pos = 0;

    let splitted = [];

    for (; pos < this.length; pos += size) {
      splitted.push(this.slice(pos, pos + size));
    }

    return splitted;
  }

}

module.exports = BC;
