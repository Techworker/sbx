const BC = require('@pascalcoin-sbx/common').BC;
const RawCoder = require('@pascalcoin-sbx/signing').RawOperationsCoder;
const RawOps = require('@pascalcoin-sbx/signing').RawOperations;
const DelistOperation = require('@pascalcoin-sbx/signing').Operations.DeListAccountForSale.Operation;
const PublicKeyCoder = require('@pascalcoin-sbx/common').Coding.Pascal.Keys.PublicKey;
const PublicKey = require('@pascalcoin-sbx/common').Types.Keys.PublicKey;

const chai = require('chai');
const expect = chai.expect;

let fixture = {
  signerPublicKey: '3GhhbosVBRMsQMvLY1Cn5guy2cNWzimvvDD1GACZ57sDCRCS7emamBWnCohZgT3C3WzryVqkxnLYC27cEjtzjh2hrcnza2ndWVyfmW',
  signer: 1554325,
  target: 1554326,
  fee: 0.0001,
  payload: 'test',
  n_operation: 2,
  r: 'E45E846517758C9F47D5C0F0003C7308C30FDA0D3F8868966F3978394721EF62',
  s: '89F1035FF9A5F49E1FBC03786A208D2EAD599665B3D2AFD44ABDCFAA58132919',
  raw: '010000000500000095B7170096B7170005000200000001000000000000000400746573742000E45E846517758C9F47D5C0F0003C7308C30FDA0D3F8868966F3978394721EF62200089F1035FF9A5F49E1FBC03786A208D2EAD599665B3D2AFD44ABDCFAA58132919'
};

describe('Operations.Delist', () => {
  it('can be decode a signed operation', () => {
    let decoded = new RawCoder().decodeFromBytes(BC.fromHex(fixture.raw));

    expect(decoded.operations[0].operation.r.toHex()).to.be.equal(fixture.r);
    expect(decoded.operations[0].operation.s.toHex()).to.be.equal(fixture.s);
    expect(decoded.operations[0].operation.signer.account).to.be.equal(fixture.signer);
    expect(decoded.operations[0].operation.target.account).to.be.equal(fixture.target);
    expect(decoded.operations[0].operation.nOperation).to.be.equal(fixture.n_operation);
    expect(decoded.operations[0].operation.fee.toStringOpt()).to.be.equal(fixture.fee.toString());
    expect(decoded.operations[0].operation.payload.toString()).to.be.equal(fixture.payload);
    expect(decoded.operations[0].operation.payloadType).to.be.equal(fixture.payload_type);
  });

  it('can decode signed operation and encode it again', () => {
    let decoded = new RawCoder().decodeFromBytes(BC.fromHex(fixture.raw));
    expect(new RawCoder().encodeToBytes(decoded).toHex()).to.be.equal(fixture.raw);
  });

  it('can be build by hand', () => {
    const op = new DelistOperation(fixture.signer, fixture.target);

    op.withNOperation(fixture.n_operation);
    op.withPayload(fixture.payload);
    op.withFee(fixture.fee);
    op.withSign(fixture.r, fixture.s);

    let encoded = new RawCoder().encodeToBytes(new RawOps().addOperation(null, op));

    expect(encoded.toHex()).to.be.equal(fixture.raw);
  });
});
