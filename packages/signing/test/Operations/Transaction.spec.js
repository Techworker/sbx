const BC = require('@pascalcoin-sbx/common').BC;
const RawCoder = require('@pascalcoin-sbx/signing').RawOperationsCoder;
const RawOps = require('@pascalcoin-sbx/signing').RawOperations;
const TransactionOperation = require('@pascalcoin-sbx/signing').Operations.Transaction.Operation;

const chai = require('chai');
const expect = chai.expect;

let fixture = {
  sender: 1440500,
  target: 1440503,
  senderPubkey: '3GhhbojvCFtyYSPxXfuk86uvJhURBEzF2fxV7x6kuW3Gi7ApSDd1scztAXGyeqphytxi6XibueQCoAG3yBCkXvg1BfGnosd6xKnKPT',
  targetPubkey: '3GhhbojvCFtyYSPxXfuk86uvJhURBEzF2fxV7x6kuW3Gi7ApSDd1scztAXGyeqphytxi6XibueQCoAG3yBCkXvg1BfGnosd6xKnKPT',
  amount: 0.0015,
  fee: 0.0002,
  payload: 'techworker',
  n_operation: 4003,
  r: '1201D10D537B0F6D7CB2032A768A851E0EF2426AA37756BCADB994AF189D124A',
  s: '9DACA47597ADFB3E529B82EB231396F464EE1C4E76DC6E85CD10CA3711C2D6C2',
  raw: '0100000001000000F4FA1500A30F0000F7FA15000F0000000000000002000000000000000A0074656368776F726B657200000000000020001201D10D537B0F6D7CB2032A768A851E0EF2426AA37756BCADB994AF189D124A20009DACA47597ADFB3E529B82EB231396F464EE1C4E76DC6E85CD10CA3711C2D6C2'
};

describe('Operations.Transaction', () => {
  it('can be decode a signed operation', () => {
    let decoded = new RawCoder().decodeFromBytes(BC.fromHex(fixture.raw));

    expect(decoded.operations[0].operation.r.toHex()).to.be.equal(fixture.r);
    expect(decoded.operations[0].operation.s.toHex()).to.be.equal(fixture.s);
    expect(decoded.operations[0].operation.sender.account).to.be.equal(fixture.sender);
    expect(decoded.operations[0].operation.target.account).to.be.equal(fixture.target);
    expect(decoded.operations[0].operation.amount.toStringOpt()).to.be.equal(fixture.amount.toString());
    expect(decoded.operations[0].operation.fee.toStringOpt()).to.be.equal(fixture.fee.toString());
    expect(decoded.operations[0].operation.nOperation).to.be.equal(fixture.n_operation);
    expect(decoded.operations[0].operation.payload.toString()).to.be.equal(fixture.payload);
  });

  it('can be decode signed operation and encode it again', () => {
    let decoded = new RawCoder().decodeFromBytes(BC.fromHex(fixture.raw));

    expect(new RawCoder().encodeToBytes(decoded).toHex()).to.be.equal(fixture.raw);
  });

  it('can be build by hand', () => {
    const op = new TransactionOperation(fixture.sender, fixture.target, fixture.amount);

    op.withNOperation(fixture.n_operation);
    op.withPayload(fixture.payload);
    op.withFee(fixture.fee);
    op.withSign(fixture.r, fixture.s);

    let encoded = new RawCoder().encodeToBytes(new RawOps().addOperation(null, op));

    expect(encoded.toHex()).to.be.equal(fixture.raw);
  });
});
