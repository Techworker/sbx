/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
const Coding = require('@pascalcoin-sbx/common').Coding;
const Endian = require('@pascalcoin-sbx/common').Endian;
const CompositeType = Coding.CompositeType;

const Account = require('@pascalcoin-sbx/json-rpc').Types.Account;
const PublicKey = require('@pascalcoin-sbx/common').Types.Keys.PublicKey;

/**
 * The digest encoder of a DATA Operation.
 */
class AccountInStateCoder extends CompositeType {
  /**
   * Constructor
   */
  constructor() {
    super('serialized_account');
    this.description('Serialized account used for seal creation.');
    // config for digest creation
    this.addSubType(new Coding.Decissive('state', 'state', (markerValue) => {
      switch (markerValue) {
        case Account.STATE_LISTED:
          return new Coding.Core.Int16('state_listed', true, Endian.LITTLE_ENDIAN).withFixedValue(1000);
        case Account.STATE_ACCOUNT_SWAP:
          return new Coding.Core.Int16('state_account_swap', true, Endian.LITTLE_ENDIAN).withFixedValue(1001);
        case Account.STATE_COIN_SWAP:
          return new Coding.Core.Int16('state_coin_swap', true, Endian.LITTLE_ENDIAN).withFixedValue(1002);

        default:
          throw new Error('Unable to map marker to a coder.');
      }
    }));
    this.addSubType(
      new Coding.Pascal.Keys.PublicKey('publicKey')
        .description('public key of the account')
    );
    this.addSubType(
      new Coding.Core.Int32('lockedUntilBlock', true, Endian.LITTLE_ENDIAN)
        .description('The block number until the account is locked.')
    );
    this.addSubType(
      new Coding.Pascal.Currency('price')
        .description('The price of the account.')
    );
    this.addSubType(
      new Coding.Pascal.Currency('sellerAccount')
        .description('The account to pay.')
    );
    this.addSubType(
      new Coding.Pascal.Keys.PublicKey('newPublicKey')
        .description('new public key of the account')
        .withDefaultValue(PublicKey.empty(), v => v === null)
    );
    this.addSubType(new Coding.Decissive('state', 'state', (markerValue) => {
      switch (markerValue) {
        case Account.STATE_ACCOUNT_SWAP:
        case Account.STATE_COIN_SWAP:
          return new Coding.Core.BytesWithLength('hashedSecret', 2);
        default:
          return null;
      }
    }, true));
  }
}

module.exports = AccountInStateCoder;
