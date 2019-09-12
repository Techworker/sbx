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
    const accounts = JSON.parse(fs.readFileSync(path.join(__dirname, '/../fixtures/accounts.json')));

    accounts.forEach((raw) => {
      let account = Account.createFromRPC(raw);

      expect(account.account.account).to.be.equal(raw.account);
      expect(account.publicKey).to.be.instanceof(PublicKey);
      expect(pkCoder.encodeToBytes(account.publicKey).toHex()).to.be.equal(raw.enc_pubkey);

      expect(account.balance).to.be.instanceof(Currency);
      expect(account.balance.toString()).to.be.equal(raw.balance_s.toString());

      expect(account.nOperation).to.be.equal(raw.n_operation);
      expect(account.updatedB).to.be.equal(raw.updated_b);
      expect(account.state).to.be.equal(raw.state);
      expect(account.name.toString()).to.be.equal(raw.name);
      expect(account.type).to.be.equal(raw.type);

      // normal
      if (raw.locked_until_block === undefined) {
        expect(account.lockedUntilBlock).to.be.equal(null);
      } else {
        expect(account.lockedUntilBlock).to.be.equal(raw.locked_until_block);
      }

      if (raw.price_s === undefined) {
        expect(account.price).to.be.equal(null);
      } else {
        expect(account.price).to.be.instanceof(Currency);
        expect(account.price.toString()).to.be.equal(raw.price_s.toString());
      }

      if (raw.seller_account === undefined) {
        expect(account.sellerAccount).to.be.equal(null);
      } else {
        expect(account.sellerAccount).to.be.instanceof(AccountNumber);
        expect(account.sellerAccount.account).to.be.equal(raw.seller_account);
      }

      if (raw.private_sale === undefined) {
        expect(account.privateSale).to.be.equal(false);
      } else {
        expect(account.privateSale).to.be.equal(raw.private_sale);
      }

      if (raw.new_enc_pubkey === undefined || raw.new_enc_pubkey === '000000000000') {
        expect(account.newPublicKey).to.be.equal(null);
      } else {
        expect(account.newPublicKey).to.be.instanceof(PublicKey);
        expect(pkCoder.encodeToBytes(account.newPublicKey).toHex()).to.be.equal(raw.new_enc_pubkey);
      }

      if (raw.data === undefined) {
        expect(account.data).to.be.equal(null);
      } else {
        expect(account.data).to.be.instanceof(BC);
        expect(account.data.toHex()).to.be.equal(raw.data);
      }

      if (raw.seal === undefined) {
        expect(account.seal).to.be.equal(null);
      } else {
        expect(account.seal).to.be.instanceof(BC);
        expect(account.seal.toHex()).to.be.equal(raw.seal);
      }

      if (raw.hashed_secret === undefined) {
        expect(account.hashedSecret).to.be.equal(null);
      } else {
        expect(account.hashedSecret).to.be.instanceof(BC);
        expect(account.hashedSecret.toHex()).to.be.equal(raw.hashed_secret);
      }

      if (raw.amount_to_swap_s === undefined) {
        expect(account.amountToSwap).to.be.equal(null);
      } else {
        expect(account.amountToSwap).to.be.instanceof(Currency);
        expect(account.amountToSwap.toString()).to.be.equal(raw.amount_to_swap_s.toString());
      }

      if (raw.receiver_swap_account === undefined) {
        expect(account.receiverSwapAccount).to.be.equal(null);
      } else {
        expect(account.receiverSwapAccount).to.be.instanceof(AccountNumber);
        expect(account.receiverSwapAccount.account).to.be.equal(raw.receiver_swap_account);
      }
    });

  });
});
