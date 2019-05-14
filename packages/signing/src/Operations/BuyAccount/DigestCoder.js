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
    super('buy_operation_digest');
    super.description('Digest for buy account operation');
    // config for digest creation
    this.addSubType(
      new Coding.Pascal.AccountNumber('sender')
        .description('The buyer account.')
    );
    this.addSubType(
      new Coding.Pascal.NOperation()
        .description('The next n_operation value of the buyer.')
    );
    this.addSubType(
      new Coding.Pascal.AccountNumber('target')
        .description('The account to buy')
    );
    this.addSubType(
      new Coding.Pascal.Currency('amount')
        .description('The amount paid for the account.')
    );
    this.addSubType(
      new Coding.Pascal.Currency('fee')
        .description('The fee paid for the operation.')
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
      new Coding.Pascal.Currency('price')
        .description('The price of the account to buy')
    );
    this.addSubType(
      new Coding.Pascal.AccountNumber('seller')
        .description('The account number of the seller')
    );
    this.addSubType(
      new Coding.Pascal.Keys.PublicKey('newPublicKey')
        .description('The new public key of the account.')
    );
    this.addSubType(
      new Coding.Pascal.OpType('optype', 1)
        .withFixedValue(opType)
        .description('The buy account optype as 8 bit int8')
    );
  }
}

module.exports = DigestCoder;
