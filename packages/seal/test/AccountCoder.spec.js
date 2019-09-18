const fs = require('fs');
const path = require('path');

const AccountCoder = require('@pascalcoin-sbx/seal').AccountCoder;
const Account = require('@pascalcoin-sbx/json-rpc').Types.Account;

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

const expect = chai.expect;

describe('Seal.AccountCoder', () => {
  it('can write an account', function (done) {
    const accountListed = Account.createFromRPC({
      account: 476402,
      enc_pubkey: 'CA02200046511689C97EDCC50D773145BDB0063154B6CA4DF8BEE161B7C577E11F7E34E320000A4668AB157031BFD09C3BFDAD749734ABB97E9C9A1176A66B6B401EEF458D7A',
      balance: 0.0001,
      balance_s: '0.0001',
      n_operation: 2,
      updated_b: 171189,
      state: 'listed',
      locked_until_block: 171189,
      price: 0.0001,
      price_s: '0.0001',
      seller_account: 495853,
      private_sale: true,
      name: '',
      type: 0
    });
    const coder = new AccountCoder();
    console.log(coder.encodeToBytes(accountListed).toHex());
  });
});
