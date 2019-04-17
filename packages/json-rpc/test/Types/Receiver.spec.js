const fs = require('fs');
const path = require('path');
const Operation = require('@pascalcoin-sbx/json-rpc').Types.Operation;
const Receiver = require('@pascalcoin-sbx/json-rpc').Types.Receiver;
const Currency = require('@pascalcoin-sbx/common').Types.Currency;
const AccountNumber = require('@pascalcoin-sbx/common').Types.AccountNumber;
const BC = require('@pascalcoin-sbx/common').BC;

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

describe('Core.Types.Operation.Receiver', () => {
  it('can be created from a RPC response', () => {

    optypes.forEach((opt) => {
      const operations = JSON.parse(fs.readFileSync(path.join(__dirname, '/../fixtures/ops/optype_' + opt + '.json')));

      operations.forEach((rawOp) => {
        rawOp.receivers.forEach((rawReceiver) => {
          new Receiver(rawReceiver);
        });
      });
    });
  });

  it('can be created from raw and contains valid values', () => {
    optypes.forEach((opt) => {
      const operations = JSON.parse(fs.readFileSync(path.join(__dirname, '/../fixtures/ops/optype_' + opt + '.json')));

      operations.forEach((rawOp) => {
        rawOp.senders.forEach((rawReceiver) => {
          let receiver = new Receiver(rawReceiver);

          expect(receiver.account).to.be.instanceof(AccountNumber);
          expect(receiver.account.account).to.be.equal(rawReceiver.account);

          expect(receiver.amount).to.be.instanceof(Currency);
          expect(receiver.amount.toStringOpt()).to.be.equal(rawReceiver.amount.toString());
          expect(receiver.payload).to.be.instanceof(BC);
          expect(receiver.payload.toHex()).to.be.equal(rawReceiver.payload);
        });
      });
    });

  });
});
