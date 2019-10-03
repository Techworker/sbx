const fs = require('fs');
const path = require('path');
const Operation = require('@pascalcoin-sbx/common').Objects.Operation;
const Sender = require('@pascalcoin-sbx/common').Objects.Sender;
const Currency = require('@pascalcoin-sbx/common').Types.Currency;
const Payload = require('@pascalcoin-sbx/common').Types.Payload;
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

describe('Core.Types.Operation.Sender', () => {
  it('can be created from a RPC response', () => {

    optypes.forEach((opt) => {
      const operations = JSON.parse(fs.readFileSync(path.join(__dirname, '/../fixtures/ops/optype_' + opt + '.json')));

      operations.forEach((rawOp) => {
        rawOp.senders.forEach((rawSender) => {
          Sender.createFromObject(rawSender);
        });
      });
    });
  });

  it('can be created from raw and contains valid values', () => {
    optypes.forEach((opt) => {
      const operations = JSON.parse(fs.readFileSync(path.join(__dirname, '/../fixtures/ops/optype_' + opt + '.json')));

      operations.forEach((rawOp) => {
        rawOp.senders.forEach((rawSender) => {
          let sender = Sender.createFromObject(rawSender);

          expect(sender.accountNumber).to.be.instanceof(AccountNumber);
          expect(sender.accountNumber.account).to.be.equal(rawSender.account);
          expect(sender.nOperation).to.be.equal(rawSender.n_operation);

          expect(sender.amount).to.be.instanceof(Currency);
          expect(sender.amount.toStringOpt()).to.be.equal(rawSender.amount_s.toString());
          expect(sender.payload).to.be.instanceof(Payload);
          expect(sender.payload.toHex()).to.be.equal(rawSender.payload);
        });
      });
    });

  });
});
