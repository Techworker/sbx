const BC = require('@pascalcoin-sbx/common').BC;
const RawCoder = require('@pascalcoin-sbx/signing').RawOperationsCoder;
const RawOps = require('@pascalcoin-sbx/signing').RawOperations;
const ListAccountForSaleOperation = require('@pascalcoin-sbx/signing').Operations.ListAccountForSale.Operation;
const PublicKeyCoder = require('@pascalcoin-sbx/common').Coding.Pascal.Keys.PublicKey;

const chai = require('chai');
const expect = chai.expect;

let fixture = {
  signerPublicKey: '3GhhbojvCFtyYSPxXfuk86uvJhURBEzF2fxV7x6kuW3Gi7ApSDd1scztAXGyeqphytxi6XibueQCoAG3yBCkXvg1BfGnosd6xKnKPT',
  signer: 1440500,
  target: 1440503,
  seller: 1440500,
  lockedUntilBlock: 350000,
  price: 0.0017,
  newPublicKey: '3Ghhbommc5imqoAUAzXoEJpYo1qLiyVZip3Pwsj7WUXq7aFXwC4tw1MFsRrhPnA51CMAoeoyGJcMGV1dSU9FAqXRsnV2LLT7tBKDeY',
  fee: 0.0002,
  payload: 'techworker',
  n_operation: 4003,
  s: '32D4CAF3A0FCF1854C00E18FA0838A2EF926C63FAEEF7C862E1750CB6D20DFD0',
  r: 'A8A08439B6A54BF7E42EFB971B5709874E7F12F6B265684CAA9937BD28BDC793',
  raw: '0100000004000000F4FA1500F7FA15000400A30F00001100000000000000F4FA15000000000000004600CA0220003078FA6B1419BD6F4D4F6A779358EBFA6BC12F3CE32E47A8D9F7CD5FA8956FF0200053A101778813DD24B90A5198BAE5EB9F8AA5EDFD30E4C130A69FDD62CAE774F93057050002000000000000000A0074656368776F726B65722000A8A08439B6A54BF7E42EFB971B5709874E7F12F6B265684CAA9937BD28BDC793200032D4CAF3A0FCF1854C00E18FA0838A2EF926C63FAEEF7C862E1750CB6D20DFD0'
};

describe('Operations.ListAccountForSale', () => {
  it('can be decode a signed operation', () => {
    let decoded = new RawCoder().decodeFromBytes(BC.fromHex(fixture.raw));

    expect(decoded.operations[0].operation.r.toHex()).to.be.equal(fixture.r);
    expect(decoded.operations[0].operation.s.toHex()).to.be.equal(fixture.s);
    expect(decoded.operations[0].operation.signer.account).to.be.equal(fixture.signer);
    expect(decoded.operations[0].operation.target.account).to.be.equal(fixture.target);
    expect(decoded.operations[0].operation.accountToPay.account).to.be.equal(fixture.seller);
    expect(decoded.operations[0].operation.nOperation).to.be.equal(fixture.n_operation);
    expect(decoded.operations[0].operation.price.toStringOpt()).to.be.equal(fixture.price.toString());
    expect(decoded.operations[0].operation.fee.toStringOpt()).to.be.equal(fixture.fee.toString());
    expect(decoded.operations[0].operation.lockedUntilBlock).to.be.equal(fixture.lockedUntilBlock);
    expect(decoded.operations[0].operation.payload.toString()).to.be.equal(fixture.payload);
    expect(new PublicKeyCoder().encodeToBase58(decoded.operations[0].operation.newPublicKey)).to.be.equal(fixture.newPublicKey);
  });

  it('can be decode signed operation and encode it again', () => {
    let decoded = new RawCoder().decodeFromBytes(BC.fromHex(fixture.raw));

    expect(new RawCoder().encodeToBytes(decoded).toHex()).to.be.equal(fixture.raw);
  });

  it('can be build by hand', () => {
    const op = new ListAccountForSaleOperation(fixture.signer, fixture.target, fixture.price, fixture.seller);

    op.withNOperation(fixture.n_operation);
    op.withPayload(fixture.payload);
    op.asPrivateSale(new PublicKeyCoder().decodeFromBase58(fixture.newPublicKey), fixture.lockedUntilBlock);
    op.withFee(fixture.fee);
    op.withSign(fixture.r, fixture.s);

    let encoded = new RawCoder().encodeToBytes(new RawOps().addOperation(null, op));

    expect(encoded.toHex()).to.be.equal(fixture.raw);
  });
});
