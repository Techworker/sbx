/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const Coding = require('@pascalcoin-sbx/common').Coding;
const CompositeType = Coding.CompositeType;
const Receiver = require('./Receiver');

/**
 * The raw coder for a ChangeKey operation.
 */
class RawAndDigestCoder extends CompositeType {
  /**
   * Constructor
   */
  constructor() {
    super('multiop_receiver_raw');
    this.description('The coder for the raw representation of a MultiOperation.Receiver');
    this.addSubType(
      new Coding.Pascal.AccountNumber('account')
        .description('The account of the operation.')
    );
    this.addSubType(
      new Coding.Pascal.Currency('amount')
        .description('The amount sent by the sender.')
    );
    this.addSubType(
      new Coding.Core.BytesWithLength('payload', 2)
        .description('The payload of the operation.')
    );
  }

  /**
   * @inheritDoc AbstractType#typeInfo
   */
  /* istanbul ignore next */
  get typeInfo() {
    let info = super.typeInfo;

    info.name = 'MultiOperation.Receiver (RAW)';
    info.hierarchy.push(info.name);
    return info;
  }

  /**
   * Decodes the encoded Sender.
   *
   * @param {BC|Buffer|Uint8Array|String} bc
   * @param {Object} options
   * @param {*} all
   * @return {ChangeKey}
   */
  decodeFromBytes(bc, options = {}, all = null) {
    const decoded = super.decodeFromBytes(bc);
    const receiver = new Receiver(
      decoded.account,
      decoded.amount
    );

    receiver.withPayload(decoded.payload);
    receiver.withNOperation(decoded.nOperation);
    receiver.withSign(decoded.r, decoded.s);

    return receiver;
  }

}

module.exports = RawAndDigestCoder;
