/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const Coding = require('@pascalcoin-sbx/common').Coding;
const CompositeType = Coding.CompositeType;
const PublicKey = require('@pascalcoin-sbx/common').Types.Keys.PublicKey;
const Operation = require('./Operation');

/**
 * A DATA operation object that can be signed.
 */
class RawCoder extends CompositeType {
  constructor(opType) {
    super('buy_operation_raw');
    this.description('Encoded BuyAccount Operation');
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
      new Coding.Core.BytesWithLength('r')
        .description('R value of the sign operation.')
    );
    this.addSubType(
      new Coding.Core.BytesWithLength('s')
        .description('S value of the sign operation.')
    );
  }

  decodeFromBytes(bc) {
    const decoded = super.decodeFromBytes(bc);
    const op = new Operation(
      decoded.signer,
      decoded.target
    );

    op.withNewType(decoded.type);
    op.withNewName(decoded.name);
    op.withNewPublicKey(decoded.newPublicKey);
    op.withFee(decoded.fee);
    op.withPayload(decoded.payload);
    op.signFromDecoded(decoded.nOperation, decoded.r, decoded.s);

    return op;
  }

}

module.exports = RawCoder;
