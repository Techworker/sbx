const BC = require('@pascalcoin-sbx/common').BC;
const RawCoder = require('@pascalcoin-sbx/signing').RawOperationsCoder;
const RawOps = require('@pascalcoin-sbx/signing').RawOperations;
const ChangeAccountInfoOperation = require('@pascalcoin-sbx/signing').Operations.ChangeAccountInfo.Operation;
const PublicKeyCoder = require('@pascalcoin-sbx/common').Coding.Pascal.Keys.PublicKey;

const chai = require('chai');
const expect = chai.expect;

let fixture = {
  signerPublicKey: '3GhhbojvCFtyYSPxXfuk86uvJhURBEzF2fxV7x6kuW3Gi7ApSDd1scztAXGyeqphytxi6XibueQCoAG3yBCkXvg1BfGnosd6xKnKPT',
  signer: 1440500,
  target: 1440503,
  newPublicKey: '3Ghhbommc5imqoAUAzXoEJpYo1qLiyVZip3Pwsj7WUXq7aFXwC4tw1MFsRrhPnA51CMAoeoyGJcMGV1dSU9FAqXRsnV2LLT7tBKDeY',
  newName: 'techworker123',
  newType: '345',
  n_operation: 4003,
  fee: 0.0002,
  payload_type: 0,
  payload: 'techworker',
  r: '28D54FB4B87C8DEA5884876FA6DDD30115B1EAECEA50869181CC05D788C74D6A',
  s: '61E719DCEE48E93B94BC0938D1CADDBCB7E59F259097C622C98E5D0C758BB5AC',
  raw: '0100000008000000F4FA1500F7FA1500A30F000002000000000000000A0074656368776F726B657200000000000007CA0220003078FA6B1419BD6F4D4F6A779358EBFA6BC12F3CE32E47A8D9F7CD5FA8956FF0200053A101778813DD24B90A5198BAE5EB9F8AA5EDFD30E4C130A69FDD62CAE774F90D0074656368776F726B65723132335901200028D54FB4B87C8DEA5884876FA6DDD30115B1EAECEA50869181CC05D788C74D6A200061E719DCEE48E93B94BC0938D1CADDBCB7E59F259097C622C98E5D0C758BB5AC'
};

describe('Operations.ChangeAccountInfo', () => {
  it('can decode a signed operation', () => {
    let decoded = new RawCoder().decodeFromBytes(BC.fromHex(fixture.raw));

    expect(decoded.operations[0].operation.r.toHex()).to.be.equal(fixture.r);
    expect(decoded.operations[0].operation.s.toHex()).to.be.equal(fixture.s);
    expect(decoded.operations[0].operation.signer.account).to.be.equal(fixture.signer);
    expect(decoded.operations[0].operation.target.account).to.be.equal(fixture.target);
    expect(decoded.operations[0].operation.nOperation).to.be.equal(fixture.n_operation);
    expect(decoded.operations[0].operation.fee.toStringOpt()).to.be.equal(fixture.fee.toString());
    expect(decoded.operations[0].operation.payload.toString()).to.be.equal(fixture.payload);
    expect(decoded.operations[0].operation.payloadType).to.be.equal(fixture.payload_type);
    expect(decoded.operations[0].operation.changeType & 1).to.be.equal(1);
    expect(decoded.operations[0].operation.changeType & 2).to.be.equal(2);
    expect(decoded.operations[0].operation.changeType & 4).to.be.equal(4);
    expect(decoded.operations[0].operation.changeType & 8).to.be.equal(8);
    expect(decoded.operations[0].operation.newName.toString()).to.be.equal(fixture.newName);
    expect(decoded.operations[0].operation.newType.toString()).to.be.equal(fixture.newType);
    expect(new PublicKeyCoder().encodeToBase58(decoded.operations[0].operation.newPublicKey)).to.be.equal(fixture.newPublicKey);
  });

  it('can be decode signed operation and encode it again', () => {
    let decoded = new RawCoder().decodeFromBytes(BC.fromHex(fixture.raw));

    expect(new RawCoder().encodeToBytes(decoded).toHex()).to.be.equal(fixture.raw);
  });

  it('can be build by hand', () => {
    const op = new ChangeAccountInfoOperation(fixture.signer, fixture.target);

    op.withNewName(fixture.newName);
    op.withNewType(fixture.newType);
    op.withNewPublicKey(new PublicKeyCoder().decodeFromBase58(fixture.newPublicKey));
    op.withNOperation(fixture.n_operation);
    op.withPayload(fixture.payload);
    op.withFee(fixture.fee);
    op.withSign(fixture.r, fixture.s);

    let encoded = new RawCoder().encodeToBytes(new RawOps().addOperation(null, op));

    expect(encoded.toHex()).to.be.equal(fixture.raw);
  });
});
