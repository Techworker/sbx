/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const Coding = require('@pascalcoin-sbx/common').Coding;
const CompositeType = Coding.CompositeType;

/**
 * The raw coder for a MultiOperation.Receiver.
 */
class RawAndDigestCoder extends CompositeType {
  /**
   * Constructor
   */
  constructor() {
    super('multiop_receiver_raw');
    this.description('The coder for the raw and digest representation of a MultiOperation.Receiver');
    this.addSubType(
      new Coding.Pascal.AccountNumber('account')
        .description('The account of the operation.')
    );
    this.addSubType(
      new Coding.Pascal.Currency('amount')
        .description('The amount sent by the sender.')
    );
    this.addSubType(
      new Coding.Core.BytesWithLength('payload', 2, 'payload_length', 'The length of the payload')
        .description('The payload of the operation.')
    );
  }

  /**
   * @inheritDoc AbstractType#typeInfo
   */
  /* istanbul ignore next */
  get typeInfo() {
    let info = super.typeInfo;

    info.name = 'MultiOperation.Receiver (RAW & DIGEST)';
    info.hierarchy.push(info.name);
    return info;
  }
}

module.exports = RawAndDigestCoder;
