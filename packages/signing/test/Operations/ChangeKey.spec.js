const BC = require('@pascalcoin-sbx/common').BC;
const RawCoder = require('@pascalcoin-sbx/signing').RawOperationsCoder;
const RawOps = require('@pascalcoin-sbx/signing').RawOperations;
const ChangeKeyOperation = require('@pascalcoin-sbx/signing').Operations.ChangeKey.Operation;
const PublicKeyCoder = require('@pascalcoin-sbx/common').Coding.Pascal.Keys.PublicKey;

const chai = require('chai');
const expect = chai.expect;

let fixture = {
  signer: 1440500,
  oldPublicKey: '3GhhbojvCFtyYSPxXfuk86uvJhURBEzF2fxV7x6kuW3Gi7ApSDd1scztAXGyeqphytxi6XibueQCoAG3yBCkXvg1BfGnosd6xKnKPT',
  newPublicKey: '3Ghhbommc5imqoAUAzXoEJpYo1qLiyVZip3Pwsj7WUXq7aFXwC4tw1MFsRrhPnA51CMAoeoyGJcMGV1dSU9FAqXRsnV2LLT7tBKDeY',
  fee: 0.0002,
  n_operation: 4003,
  payload: 'techworker',
  s: '40041D0D33034504B20C51277F76F2784BAE43C46F60526B50F37D90C8310919',
  r: '0981C22EDEE3E56DEBFABB8DF6229C10971E283D9B01B2D914176EFDAEF891F5',
  raw: '0100000002000000F4FA1500A30F000002000000000000000A0074656368776F726B65720000000000004600CA0220003078FA6B1419BD6F4D4F6A779358EBFA6BC12F3CE32E47A8D9F7CD5FA8956FF0200053A101778813DD24B90A5198BAE5EB9F8AA5EDFD30E4C130A69FDD62CAE774F920000981C22EDEE3E56DEBFABB8DF6229C10971E283D9B01B2D914176EFDAEF891F5200040041D0D33034504B20C51277F76F2784BAE43C46F60526B50F37D90C8310919'
};

describe('Operations.ChangeKey', () => {
  it('can be decode a signed operation', () => {
    let decoded = new RawCoder().decodeFromBytes(BC.fromHex(fixture.raw));

    expect(decoded.operations[0].operation.r.toHex()).to.be.equal(fixture.r);
    expect(decoded.operations[0].operation.s.toHex()).to.be.equal(fixture.s);
    expect(decoded.operations[0].operation.signer.account).to.be.equal(fixture.signer);
    expect(decoded.operations[0].operation.nOperation).to.be.equal(fixture.n_operation);
    expect(decoded.operations[0].operation.fee.toStringOpt()).to.be.equal(fixture.fee.toString());
    expect(decoded.operations[0].operation.payload.toString()).to.be.equal(fixture.payload);
    expect(new PublicKeyCoder().encodeToBase58(decoded.operations[0].operation.newPublicKey)).to.be.equal(fixture.newPublicKey);
  });

  it('can be decode signed operation and encode it again', () => {
    let decoded = new RawCoder().decodeFromBytes(BC.fromHex(fixture.raw));

    expect(new RawCoder().encodeToBytes(decoded).toHex()).to.be.equal(fixture.raw);
  });

  it('can be build by hand', () => {
    const op = new ChangeKeyOperation(fixture.signer, new PublicKeyCoder().decodeFromBase58(fixture.newPublicKey));

    op.withNOperation(fixture.n_operation);
    op.withPayload(fixture.payload);
    op.withFee(fixture.fee);
    op.withSign(fixture.r, fixture.s);

    let encoded = new RawCoder().encodeToBytes(new RawOps().addOperation(null, op));

    expect(encoded.toHex()).to.be.equal(fixture.raw);
  });
});
