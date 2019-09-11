const fs = require('fs');
const path = require('path');
const Account = require('@pascalcoin-sbx/json-rpc').Types.Account;
const PublicKey = require('@pascalcoin-sbx/common').Types.Keys.PublicKey;
const Currency = require('@pascalcoin-sbx/common').Types.Currency;
const AccountNumber = require('@pascalcoin-sbx/common').Types.AccountNumber;
const BC = require('@pascalcoin-sbx/common').BC;
const BN = require('bn.js');
const PublicKeyCoder = require('@pascalcoin-sbx/common').Coding.Pascal.Keys.PublicKey;

const pkCoder = new PublicKeyCoder();

const chai = require('chai');

chai.expect();
const expect = chai.expect;

describe('Core.Types.Account', () => {
  it('can be created from raw and contains valid values', () => {
    const rawAccount = JSON.parse(fs.readFileSync(path.join(__dirname, '/../fixtures/account/accountNormal.json')));

    let account = Account.createFromRPC(rawAccount);

    expect(account.account.account).to.be.equal(rawAccount.account);
    expect(account.publicKey).to.be.instanceof(PublicKey);
    expect(pkCoder.encodeToBytes(account.publicKey).toHex()).to.be.equal(rawAccount.enc_pubkey);

    expect(account.balance).to.be.instanceof(Currency);
    expect(account.balance.toString()).to.be.equal(rawAccount.balance_s.toString());

    expect(account.nOperation).to.be.equal(rawAccount.n_operation);
    expect(account.updatedB).to.be.equal(rawAccount.updated_b);
    expect(account.state).to.be.equal(rawAccount.state);
    expect(account.name.toString()).to.be.equal(rawAccount.name);
    expect(account.type).to.be.equal(rawAccount.type);

    // normal
    expect(account.lockedUntilBlock).to.be.equal(null);
  });
});
