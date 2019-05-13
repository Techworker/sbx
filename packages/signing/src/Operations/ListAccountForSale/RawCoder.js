/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const PublicKey = require('@pascalcoin-sbx/common').Types.Keys.PublicKey;
const Coding = require('@pascalcoin-sbx/common').Coding;
const Endian = require('@pascalcoin-sbx/common').Endian;
const PublicKeyWithLength = require('./../../Coding/PublicKeyWithLength');
const CompositeType = Coding.CompositeType;
const Operation = require('./Operation');

/**
 * A DATA operation object that can be signed.
 */
class RawCoder extends CompositeType {
  constructor(opType) {
    super('list_operation_raw');
    this.addSubType(
      new Coding.Pascal.AccountNumber('signer')
        .description('The account that executes the operation.')
    );
    this.addSubType(
      new Coding.Pascal.AccountNumber('target')
        .description('The account that will be listed.')
    );
    this.addSubType(
      new Coding.Pascal.OpType('optype', 2)
        .withFixedValue(opType)
        .description(`The optype of the operation (${opType})`)
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
      new Coding.Pascal.Keys.PublicKey('v2_pubkey')
        .description('Empty pubkey (6 zero bytes) - previously active in <= v2.')
        .withFixedValue(PublicKey.empty())
    );
    this.addSubType(
      new PublicKeyWithLength('newPublicKey')
        .description('The new public key of the buyer (private sale).')
    );
    this.addSubType(
      new Coding.Core.Int32('lockedUntilBlock', true, Endian.LITTLE_ENDIAN)
        .description('The block number until the account is locked.')
    );
    this.addSubType(
      new Coding.Pascal.Currency('fee')
        .description('The fee associated with the operation')
    );
    this.addSubType(
      new Coding.Core.BytesWithLength('payload', 2)
        .description('The payload of the operation.')
    );
    this.addSubType(
      new Coding.Core.BytesWithLength('r', 2)
        .description('R value of the signed operation.')
    );
    this.addSubType(
      new Coding.Core.BytesWithLength('s', 2)
        .description('S value of the signed operation.')
    );
  }


  decodeFromBytes(bc) {
    const decoded = super.decodeFromBytes(bc);
    const op = new Operation(
      decoded.signer,
      decoded.target,
      decoded.price,
      decoded.accountToPay
    );

    op.asPrivateSale(decoded.newPublicKey, decoded.lockedUntilBlock);
    op.withFee(decoded.fee);
    op.withPayload(decoded.payload);
    op.signFromDecoded(decoded.nOperation, decoded.r, decoded.s);

    return op;
  }
}

module.exports = RawCoder;
