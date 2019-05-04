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
    super('change_info_operation_digest');
    // config for digest creation
    this.addSubType(
      new Coding.Pascal.AccountNumber('signer')
        .description('The signer of the operation.')
    );
    this.addSubType(
      new Coding.Pascal.AccountNumber('target')
        .description('The target account to change info of.')
    );
    this.addSubType(
      new Coding.Pascal.NOperation()
        .description('The next n_operation value of the buyer.')
    );
    this.addSubType(
      new Coding.Pascal.Currency('fee')
        .description('The fee paid for the operation.')
    );
    this.addSubType(
      new Coding.Core.BytesWithLength('payload')
        .description('The payload of the operation.')
    );
    this.addSubType(
      new Coding.Pascal.Keys.PublicKey('v2_public_key')
        .description('Empty pubkey (6 zero bytes) - previously active in <= v2.')
        .withFixedValue(PublicKey.empty())
    );
    this.addSubType(
      new Coding.Core.Int8('changeType')
        .description('The change type.')
    );
    this.addSubType(
      new Coding.Pascal.Keys.PublicKey('newPublicKey')
        .description('The new public key of the account.')
    );
    this.addSubType(
      new Coding.Pascal.AccountName('newName')
        .description('The new name of the account.')
    );
    this.addSubType(
      new Coding.Core.Int16('newType')
        .description('The new type of the account.')
    );
    this.addSubType(
      new Coding.Pascal.OpType(1).withFixedValue(opType)
        .description('The buy account optype as 8 bit int8')
    );
  }
}

module.exports = DigestCoder;
