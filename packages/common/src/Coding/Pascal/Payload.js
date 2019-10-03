/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const BytesWithLength = require('../Core/BytesWithLength');
const BytesWithoutLength = require('../Core/BytesWithoutLength');
const Int8 = require('../Core/Int8');
const CompositeType = require('../CompositeType');
const PayloadType = require('./../../Types/Payload');

/**
 * A Public Key value.
 */
class Payload extends CompositeType {

  /**
   * Constructor.
   *
   * @param {String} id
   * @param {Boolean} omitXYLenghts
   */
  constructor(id = null, withLength = false) {
    super(id || 'payload');
    this.addSubType(
      new Int8('type', true).description('The type of the payload.')
    );

    if (withLength) {
      this.addSubType(
        new BytesWithLength('payload', 2, 'payload_length', 'The length of the payload')
          .description('The payload of the operation.')
      );
    } else {
      this.addSubType(
        new BytesWithoutLength('payload')
          .description('The payload of the operation.')
      );
    }
  }

  /**
   * Reads a value and returns a new PascalCoin PublicKey instance.
   *
   * @param {BC|Buffer|Uint8Array|String} bc
   * @param {Object} options
   * @param {*} all
   * @returns {Payload}
   */
  decodeFromBytes(bc, options = {}, all = null) {
    const decoded = super.decodeFromBytes(bc);

    return new PayloadType(decoded.payload, decoded.payloadType);
  }
}

module.exports = Payload;
