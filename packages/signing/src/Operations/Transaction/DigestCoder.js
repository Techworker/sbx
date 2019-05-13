/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
const Coding = require('@pascalcoin-sbx/common').Coding;
const PublicKey = require('@pascalcoin-sbx/common').Types.Keys.PublicKey;
const CompositeType = Coding.CompositeType;

/**
 * A DATA operation object that can be signed.
 */
class DigestCoder extends CompositeType {
  constructor(opType) {

    super('tx_operation_digest');

    // config for digest creation
    this.addSubType(
      new Coding.Pascal.AccountNumber('sender')
        .description('The sender account.')
    );
    this.addSubType(
      new Coding.Pascal.NOperation('nOperation')
        .description('The next n_operation value of the sender.')
    );
    this.addSubType(
      new Coding.Pascal.AccountNumber('target')
        .description('The receiving account.')
    );
    this.addSubType(
      new Coding.Pascal.Currency('amount')
        .description('The amount that is sent from sender to receiver.')
    );
    this.addSubType(
      new Coding.Pascal.Currency('fee')
        .description('The fee included in the operation.')
    );
    this.addSubType(
      new Coding.Core.BytesWithoutLength('payload')
        .description('The payload of the operation.')
    );
    this.addSubType(
      new Coding.Pascal.Keys.Curve('v2_pubkey_curve')
        .description('Curve ID 0 - previously active in <= v2.')
        .withFixedValue(PublicKey.empty().curve)
    );
    this.addSubType(
      new Coding.Pascal.OpType('optype', 1)
        .description('Operation type.')
        .withFixedValue(opType)
    );
  }
}

module.exports = DigestCoder;
