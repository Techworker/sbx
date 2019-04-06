const fs = require('fs');
const path = require('path');
const Operation = require('@sbx/json-rpc').Types.Operation;
const Changer = require('@sbx/json-rpc').Types.Changer;
const PublicKey = require('@sbx/common').Types.Keys.PublicKey;
const Currency = require('@sbx/common').Types.Currency;
const AccountNumber = require('@sbx/common').Types.AccountNumber;
const AccountName = require('@sbx/common').Types.AccountName;

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
          new Changer(rawChanger);
        });
      });
    });
  });

  it('can be created from raw and contains valid values', () => {
    optypes.forEach((opt) => {
      const operations = JSON.parse(fs.readFileSync(path.join(__dirname, '/../fixtures/ops/optype_' + opt + '.json')));

      operations.forEach((rawOp) => {
        rawOp.changers.forEach((rawChanger) => {
          let changer = new Changer(rawChanger);

          expect(changer.account).to.be.instanceof(AccountNumber);
          expect(changer.account.account).to.be.equal(rawChanger.account);
          if (rawChanger.n_operation === undefined) {
            expect(changer.nOperation).to.be.equal(null);
          } else {
            expect(changer.nOperation).to.be.equal(rawChanger.n_operation);
          }

          if (rawChanger.new_enc_pubkey === undefined) {
            expect(changer.newPublicKey).to.be.equal(null);
          } else {
            expect(changer.newPublicKey).to.be.instanceof(PublicKey);
            expect(changer.newPublicKey.encode().toHex()).to.be.equal(rawChanger.new_enc_pubkey);
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
            expect(changer.sellerAccount).to.be.equal(null);
          } else {
            expect(changer.sellerAccount).to.be.instanceof(AccountNumber);
            expect(changer.sellerAccount.account).to.be.equal(rawChanger.seller_account);
          }

          if (rawChanger.account_price !== undefined) {
            expect(changer.accountPrice).to.be.instanceof(Currency);
            expect(changer.accountPrice.toStringOpt()).to.be.equal(rawChanger.account_price.toString());
          } else {
            expect(changer.accountPrice).to.be.equal(null);
          }

          if (rawChanger.fee !== undefined) {
            expect(changer.fee).to.be.instanceof(Currency);
            expect(changer.fee.toStringOpt()).to.be.equal(rawChanger.fee.toString());
          } else {
            expect(changer.fee.toStringOpt()).to.be.equal('0');
          }

          if (rawChanger.locked_until_block === undefined) {
            expect(changer.lockedUntilBlock).to.be.equal(null);
          } else {
            expect(changer.lockedUntilBlock).to.be.equal(rawChanger.locked_until_block);
          }

        });
      });
    });

  });

});
