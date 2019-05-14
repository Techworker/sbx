/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const Endian = require('@pascalcoin-sbx/common').Endian;
const Coding = require('@pascalcoin-sbx/common').Coding;
const CompositeType = Coding.CompositeType;
const ChangeKey = require('./Operation');

/**
 * The raw coder for a ChangeKey operation.
 */
class RawAndDigestCoder extends CompositeType {
  /**
   * Constructor
   */
  constructor() {
    super('change_key_op_raw');
    this.description('The coder for the raw representation of a ChangeKey operation');
    this.addSubType(
      new Coding.Core.Int16('protocol')
        .description('The protocol version (3).')
        .withFixedValue(3)
    );
    this.addSubType(
      new Coding.Core.Int16('sendersCount', true, Endian.LITTLE_ENDIAN)
        .description('The number of senders')
    );
    this.addSubType(
      new Coding.Repeating('senders', new RawAndDigestCoder())
        .description('Senders of the multi-operation')
    );

    this.addSubType(
      new Coding.Core.Int16('receiversCount', true, Endian.LITTLE_ENDIAN)
        .description('The number of receivers')
    );
    this.addSubType(
      new Coding.Repeating('receivers', new RawAndDigestCoder())
        .description('Receivers of the multi-operation')
    );

    this.addSubType(
      new Coding.Core.Int16('changersCount', true, Endian.LITTLE_ENDIAN)
        .description('The number of changers')
    );
    this.addSubType(
      new Coding.Repeating('changers', new RawAndDigestCoder())
        .description('Changers of the multi-operation')
    );
  }

  /**
   * @inheritDoc AbstractType#typeInfo
   */
  /* istanbul ignore next */
  get typeInfo() {
    let info = super.typeInfo;

    info.name = 'Change Key Operation (RAW)';
    info.hierarchy.push(info.name);
    return info;
  }

  /**
   * Decodes the encoded ChangeKey operation.
   *
   * @param {BC|Buffer|Uint8Array|String} bc
   * @param {Object} options
   * @param {*} all
   * @return {ChangeKey}
   */
  decodeFromBytes(bc, options = {}, all = null) {
    const decoded = super.decodeFromBytes(bc);
    const op = new ChangeKey(
      decoded.signer,
      decoded.newPublicKey
    );

    op.withFee(decoded.fee);
    op.withPayload(decoded.payload);
    op.withNOperation(decoded.nOperation);
    op.withSign(decoded.r, decoded.s);

    return op;
  }

}

module.exports = RawAndDigestCoder;
