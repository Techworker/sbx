/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const Endian = require('./../../Endian');
const Int32 = require('./../Core/Int32');

/**
 * Simple wrapper for an unsigned Int32 value (used for the n_operation value)
 */
class NOperation extends Int32 {

  /**
   * Constructor.
   *
   * @param {String} id
   */
  constructor(id = null) {
    super(id || 'nOperation', true, Endian.LITTLE_ENDIAN);
    this.description('Accounts n_operation value.');
  }
}

module.exports = NOperation;
