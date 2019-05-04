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
    super('delist_operation_digest');
    // config for digest creation
    this.addSubType(
      new Coding.Pascal.AccountNumber('signer')
        .description('The account that executes the operation.')
    );
    this.addSubType(
      new Coding.Pascal.AccountNumber('target')
        .description('The account that will be de-listed.')
    );
    this.addSubType(
      new Coding.Pascal.NOperation()
        .description('The next n_operation of the signer.')
    );
    this.addSubType(
      new Coding.Pascal.Currency('price')
        .description('The price of the target account.')
    );
    this.addSubType(
      new Coding.Pascal.AccountNumber('accountToPay')
        .description('The account where the amount goes to when the target is sold.')
    );
    this.addSubType(
      new Coding.Pascal.Currency('fee')
        .description('The fee associated with the operation')
    );
    this.addSubType(
      new Coding.Core.BytesWithoutLength('payload')
        .description('The payload of the operation.')
    );
    this.addSubType(
      new Coding.Pascal.Keys.Curve('v2_pubkey_curve')
        .withFixedValue(PublicKey.empty().curve)
        .description('Curve ID 0 - previously active in <= v2.')
    );
    this.addSubType(
      new Coding.Pascal.Keys.PublicKey('newPublicKey')
        .description('The new public key of the buyer (private sale).')
    );
    this.addSubType(
      new Coding.Core.Int32('lockedUntilBlock')
        .description('The block number until the account is locked.')
    );
    this.addSubType(
      new Coding.Pascal.OpType(1)
        .withFixedValue(opType)
        .description('The optype as 8bit int.')
    );
  }
}

module.exports = DigestCoder;
