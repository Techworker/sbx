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

const AccountInStateCoder = require('./AccountInStateCoder');

/**
 * The digest encoder of a DATA Operation.
 */
class AccountCoder extends CompositeType {
  /**
   * Constructor
   */
  constructor() {
    super('serialized_account');
    this.description('Serialized account used for seal creation.');
    // config for digest creation
    this.addSubType(
      new Coding.Pascal.AccountNumber('account')
        .description('The account number.')
    );
    this.addSubType(new Coding.Decissive('state', 'state', (markerValue) => {
      switch (markerValue) {
        case Account.STATE_NORMAL:
          return new Coding.Pascal.Keys.PublicKey('publicKey');
        case Account.STATE_LISTED:
        case Account.STATE_ACCOUNT_SWAP:
        case Account.STATE_COIN_SWAP:
          return new AccountInStateCoder('accountInState');

        default:
          throw new Error('Unable to map marker to a coder.');
      }
    }, true));
  }
}

module.exports = AccountCoder;
