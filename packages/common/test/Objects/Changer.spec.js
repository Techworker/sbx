const fs = require('fs');
const path = require('path');
const Operation = require('@pascalcoin-sbx/common').Objects.Operation;
const Changer = require('@pascalcoin-sbx/common').Objects.Changer;
const PublicKey = require('@pascalcoin-sbx/common').Types.Keys.PublicKey;
const Currency = require('@pascalcoin-sbx/common').Types.Currency;
const AccountNumber = require('@pascalcoin-sbx/common').Types.AccountNumber;
const AccountName = require('@pascalcoin-sbx/common').Types.AccountName;
const PublicKeyCoder = require('@pascalcoin-sbx/common').Coding.Pascal.Keys.PublicKey;

const pkCoder = new PublicKeyCoder();

const chai = require('chai');

chai.expect();
const expect = chai.expect;

const optypes = [
  // Operation.BLOCKCHAIN_REWARD,
  Operation.TRANSACTION,
  Operation.CHANGE_KEY,
  // Operation.RECOVER_FUNDS,
  Operation.LIST_FOR_SALE,
  Operation.DELIST,
  Operation.BUY,
  Operation.CHANGE_KEY_ACCOUNT,
  Operation.CHANGE_ACCOUNT_INFO,
  Operation.MULTI_OPERATION,
  Operation.DATA
];

describe('Core.Types.Operation.Changer', () => {
  it('can be created from a RPC response', () => {

    optypes.forEach((opt) => {
      const operations = JSON.parse(fs.readFileSync(path.join(__dirname, '/../fixtures/ops/optype_' + opt + '.json')));

      operations.forEach((rawOp) => {
        rawOp.receivers.forEach((rawChanger) => {
          Changer.createFromObject(rawChanger);
        });
      });
    });
  });

  it('can be created from raw and contains valid values', () => {
    optypes.forEach((opt) => {
      const operations = JSON.parse(fs.readFileSync(path.join(__dirname, '/../fixtures/ops/optype_' + opt + '.json')));

      operations.forEach((rawOp) => {
        rawOp.changers.forEach((rawChanger) => {
          let changer = Changer.createFromObject(rawChanger);

          expect(changer.accountNumber).to.be.instanceof(AccountNumber);
          expect(changer.accountNumber.account).to.be.equal(rawChanger.account);
          if (rawChanger.n_operation === undefined) {
            expect(changer.nOperation).to.be.equal(null);
          } else {
            expect(changer.nOperation).to.be.equal(rawChanger.n_operation);
          }

          if (rawChanger.new_enc_pubkey === undefined) {
            expect(changer.newPublicKey).to.be.equal(null);
          } else {
            expect(changer.newPublicKey).to.be.instanceof(PublicKey);
            expect(pkCoder.encodeToBytes(changer.newPublicKey).toHex()).to.be.equal(rawChanger.new_enc_pubkey);
          }

          if (rawChanger.new_name === undefined) {
            expect(changer.newName).to.be.equal(null);
          } else {
            expect(changer.newName).to.be.instanceof(AccountName);
            expect(changer.newName.toString()).to.be.equal(rawChanger.new_name);
          }

          if (rawChanger.new_type === undefined) {
            expect(changer.newType).to.be.equal(null);
          } else {
            expect(changer.newType).to.be.equal(rawChanger.new_type);
          }

          if (rawChanger.seller_account === undefined) {
            expect(changer.sellerAccountNumber).to.be.equal(null);
          } else {
            expect(changer.sellerAccountNumber).to.be.instanceof(AccountNumber);
            expect(changer.sellerAccountNumber.account).to.be.equal(rawChanger.seller_account);
          }

          if (rawChanger.account_price_s !== undefined) {
            expect(changer.accountPrice).to.be.instanceof(Currency);
            expect(changer.accountPrice.toStringOpt()).to.be.equal(rawChanger.account_price_s);
          } else {
            expect(changer.accountPrice.toStringOpt()).to.be.equal('0');
          }

          if (rawChanger.fee_s !== undefined) {
            expect(changer.fee).to.be.instanceof(Currency);
            expect(changer.fee.toStringOpt()).to.be.equal(rawChanger.fee_s.toString());
          } else {
            expect(changer.fee.toStringOpt()).to.be.equal('0');
          }

          if (rawChanger.locked_until_block === undefined) {
            expect(changer.lockedUntilBlockNumber).to.be.equal(null);
          } else {
            expect(changer.lockedUntilBlockNumber).to.be.equal(rawChanger.locked_until_block);
          }

          if (rawChanger.changes === undefined) {
            expect(changer.changes).to.be.equal(null);
          } else {
            expect(changer.changes).to.be.equal(rawChanger.changes);
          }

          if (rawChanger.hashed_secret === undefined) {
            expect(changer.hashedSecret).to.be.equal(null);
          } else {
            expect(changer.hashedSecret.toHex()).to.be.equal(rawChanger.hashed_secret);
          }

        });
      });
    });

  });

});