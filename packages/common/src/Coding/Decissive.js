/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const CompositeType = require('./CompositeType');

const P_SIZE_ENCODED = Symbol('size_encoded');
const P_SUBTYPE_RESOLVER = Symbol('subtype_resolver');
const P_MARKER_FIELD = Symbol('marker_field');

/**
 * A Type that itself is made up of multiple other types. The types are selected dynamically
 * depending on the given resolver.
 */
class Decissive extends CompositeType {
  /**
   * Constructor
   */
  constructor(id, markerField, subTypeResolver) {
    super(id || 'decissive');
    super.description('A type that itself has many sub types but only some are triggere based on a marker.');
    this[P_SUBTYPE_RESOLVER] = subTypeResolver;
    this[P_MARKER_FIELD] = markerField;
  }

  /**
   * @inheritDoc AbstractType#encodedSize
   */
  get encodedSize() {
    return this[P_SIZE_ENCODED];
  }

  /**
   * Decodes the given bytes into an object.
   *
   * @param {BC|Buffer|Uint8Array|String} bc
   * @param {Object} options
   * @param {*} all
   * @return {Object}
   */
  decodeFromBytes(bc, options = {}, all = null) {
    let subType = this[P_SUBTYPE_RESOLVER](all[this[P_MARKER_FIELD]]);

    this[P_SIZE_ENCODED] = subType.encodedSize;
    return subType.decodeFromBytes(bc, options, all);
  }

  /**
   * Encodes the given object to a list of bytes.
   *
   * @param {Object|Array} objOrArray
   * @returns {BC}
   */
  encodeToBytes(objOrArray, all) {
    let subType = this[P_SUBTYPE_RESOLVER](all[this[P_MARKER_FIELD]]);
    let bc = subType.encodeToBytes(objOrArray);

    this[P_SIZE_ENCODED] = bc.length;
    return bc;
  }
}

module.exports = Decissive;
