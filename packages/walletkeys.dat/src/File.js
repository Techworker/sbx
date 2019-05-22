/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const P_MAGIC = Symbol('magic');
const P_VERSION = Symbol('version');
const P_KEYS = Symbol('keys');

/**
 * Represents the contents of a WalletKeys.dat file.
 */
class File {

  /**
   * Constructor.
   *
   * @param {String} magic
   * @param {Number} version
   */
  constructor(magic, version) {
    this[P_MAGIC] = magic;
    this[P_VERSION] = version;
    this[P_KEYS] = [];
  }

  /**
   * Gets the magic string.
   *
   * @return {String}
   */
  get magic() {
    return this[P_MAGIC];
  }

  /**
   * Gets the file version.
   *
   * @return {Number}
   */
  get version() {
    return this[P_VERSION];
  }

  /**
   * Gets the number of keys.
   *
   * @return {Number}
   */
  get countKeys() {
    return this[P_KEYS].length;
  }

  /**
   * Gets the keys in the file.
   *
   * @return {Key[]}
   */
  get keys() {
    return this[P_KEYS];
  }

  /**
   * Adds a key to the list of keys.
   *
   * @param {Key} key
   */
  addKey(key) {
    this[P_KEYS].push(key);
  }
}

module.exports = File;
