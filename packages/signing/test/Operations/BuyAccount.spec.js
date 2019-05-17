const BC = require('@pascalcoin-sbx/common').BC;
const RawCoder = require('@pascalcoin-sbx/signing').RawOperationsCoder;
const RawOps = require('@pascalcoin-sbx/signing').RawOperations;
const BuyAccountOperation = require('@pascalcoin-sbx/signing').Operations.BuyAccount.Operation;
const PublicKeyCoder = require('@pascalcoin-sbx/common').Coding.Pascal.Keys.PublicKey;
const PublicKey = require('@pascalcoin-sbx/common').Types.Keys.PublicKey;

const chai = require('chai');
const expect = chai.expect;

let fixture = {
  signerPublicKey: '3Ghhboo1Q8CFLc9BTdcweNX75Nctifx8aW1ovF58F1VyjHRxuDQRx2xUcSSm6ragsTRUZHGPSvdwM1HnReE4Je8aYeVeZHFJf23H2z',
  buyerAccount: 1430880,
  accountToBuy: 1440500,
  price: 0.0001,
  fee: 0.0002,
  payload: 'techworker',
  seller: 1440500,
  n_operation: 4004,
  r: '3B3FF1BA82E8923F6FA8B92B10FEA291CC73E563D4CB92E58039F3D25DB98FA1',
  s: '7449069D5E034AD0B3419532B11530B52E3EBDBBBB1E754CDEADB6E709291B6B',
  raw: '010000000600000060D51500A40F0000F4FA1500000000000000000002000000000000000A0074656368776F726B6572000000000000020100000000000000F4FA150000000000000020003B3FF1BA82E8923F6FA8B92B10FEA291CC73E563D4CB92E58039F3D25DB98FA120007449069D5E034AD0B3419532B11530B52E3EBDBBBB1E754CDEADB6E709291B6B'
};

describe('Operations.BuyAccount', () => {
  it('can be decode a signed operation', () => {
    let decoded = new RawCoder().decodeFromBytes(BC.fromHex(fixture.raw));

    expect(decoded.operations[0].operation.r.toHex()).to.be.equal(fixture.r);
    expect(decoded.operations[0].operation.s.toHex()).to.be.equal(fixture.s);
    expect(decoded.operations[0].operation.sender.account).to.be.equal(fixture.buyerAccount);
    expect(decoded.operations[0].operation.target.account).to.be.equal(fixture.accountToBuy);
    expect(decoded.operations[0].operation.seller.account).to.be.equal(fixture.seller);
    expect(decoded.operations[0].operation.nOperation).to.be.equal(fixture.n_operation);
    expect(decoded.operations[0].operation.amount.toStringOpt()).to.be.equal('0');
    expect(decoded.operations[0].operation.fee.toStringOpt()).to.be.equal(fixture.fee.toString());
    expect(decoded.operations[0].operation.price.toStringOpt()).to.be.equal(fixture.price.toString());
    expect(decoded.operations[0].operation.payload.toString()).to.be.equal(fixture.payload);
  });

  it('can be decode signed operation and encode it again', () => {
    let decoded = new RawCoder().decodeFromBytes(BC.fromHex(fixture.raw));

    expect(new RawCoder().encodeToBytes(decoded).toHex()).to.be.equal(fixture.raw);
  });

  it('can be build by hand', () => {
    const op = new BuyAccountOperation(fixture.buyerAccount, fixture.accountToBuy, 0, fixture.price, fixture.seller, PublicKey.empty());

    op.withNOperation(fixture.n_operation);
    op.withPayload(fixture.payload);
    op.withFee(fixture.fee);
    op.withSign(fixture.r, fixture.s);

    let encoded = new RawCoder().encodeToBytes(new RawOps().addOperation(null, op));

    expect(encoded.toHex()).to.be.equal(fixture.raw);
  });
});
