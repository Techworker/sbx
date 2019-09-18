const BC = require('@pascalcoin-sbx/common').BC;
const RawCoder = require('@pascalcoin-sbx/signing').RawOperationsCoder;
const RawOps = require('@pascalcoin-sbx/signing').RawOperations;
const ChangeKeySignedOperation = require('@pascalcoin-sbx/signing').Operations.ChangeKeySigned.Operation;
const PublicKeyCoder = require('@pascalcoin-sbx/common').Coding.Pascal.Keys.PublicKey;

const chai = require('chai');
const expect = chai.expect;

let fixture = {
  sender: 1440500,
  target: 1440503,
  oldPublicKey: '3GhhbojvCFtyYSPxXfuk86uvJhURBEzF2fxV7x6kuW3Gi7ApSDd1scztAXGyeqphytxi6XibueQCoAG3yBCkXvg1BfGnosd6xKnKPT',
  newPublicKey: '3Ghhbommc5imqoAUAzXoEJpYo1qLiyVZip3Pwsj7WUXq7aFXwC4tw1MFsRrhPnA51CMAoeoyGJcMGV1dSU9FAqXRsnV2LLT7tBKDeY',
  fee: 0.0002,
  payload: 'techworker',
  payload_type: 0,
  n_operation: 4003,
  s: 'AEB41A5FB2D7A1B89C17897E87959AE63B9864236397FBDCFF118E964B1211C8',
  r: '5CAD340D46F1A926DCD3FA00962A0EFC856733E46285BF945B1F19A90DE2BEF8',
  raw: '0100000007000000F4FA1500F7FA1500A30F000002000000000000000A0074656368776F726B65720000000000004600CA0220003078FA6B1419BD6F4D4F6A779358EBFA6BC12F3CE32E47A8D9F7CD5FA8956FF0200053A101778813DD24B90A5198BAE5EB9F8AA5EDFD30E4C130A69FDD62CAE774F920005CAD340D46F1A926DCD3FA00962A0EFC856733E46285BF945B1F19A90DE2BEF82000AEB41A5FB2D7A1B89C17897E87959AE63B9864236397FBDCFF118E964B1211C8'
};

describe('Operations.ChangeKeySigned', () => {
  it('can be decode a signed operation', () => {
    let decoded = new RawCoder().decodeFromBytes(BC.fromHex(fixture.raw));

    expect(decoded.operations[0].operation.r.toHex()).to.be.equal(fixture.r);
    expect(decoded.operations[0].operation.s.toHex()).to.be.equal(fixture.s);
    expect(decoded.operations[0].operation.signer.account).to.be.equal(fixture.sender);
    expect(decoded.operations[0].operation.target.account).to.be.equal(fixture.target);
    expect(decoded.operations[0].operation.nOperation).to.be.equal(fixture.n_operation);
    expect(decoded.operations[0].operation.fee.toStringOpt()).to.be.equal(fixture.fee.toString());
    expect(decoded.operations[0].operation.payload.toString()).to.be.equal(fixture.payload);
    expect(decoded.operations[0].operation.payloadType).to.be.equal(fixture.payload_type);
    expect(new PublicKeyCoder().encodeToBase58(decoded.operations[0].operation.newPublicKey)).to.be.equal(fixture.newPublicKey);
  });

  it('can be decode signed operation and encode it again', () => {
    let decoded = new RawCoder().decodeFromBytes(BC.fromHex(fixture.raw));

    expect(new RawCoder().encodeToBytes(decoded).toHex()).to.be.equal(fixture.raw);
  });

  it('can be build by hand', () => {
    const op = new ChangeKeySignedOperation(fixture.sender, fixture.target, new PublicKeyCoder().decodeFromBase58(fixture.newPublicKey));

    op.withNOperation(fixture.n_operation);
    op.withPayload(fixture.payload);
    op.withFee(fixture.fee);
    op.withSign(fixture.r, fixture.s);

    let encoded = new RawCoder().encodeToBytes(new RawOps().addOperation(null, op));

    expect(encoded.toHex()).to.be.equal(fixture.raw);
  });
});
