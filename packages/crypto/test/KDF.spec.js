const KDF = require('@pascalcoin-sbx/crypto').KDF;
const BC = require('@pascalcoin-sbx/common').BC;

const chai = require('chai');

chai.expect();
const expect = chai.expect;

describe('Crypto.KDF', () => {

  it('generates key and iv without salt', () => {
    const data = KDF.PascalCoin(BC.fromString('test'));
    expect(data.key).to.be.instanceof(BC);
    expect(data.iv).to.be.instanceof(BC);

    expect(data.key.length).to.be.equal(32);
    expect(data.iv.length).to.be.equal(32);
  });

  it('generates key and iv with salt', () => {
    const data = KDF.PascalCoin(BC.fromString('test'), BC.fromString('123456798'));
    expect(data.key).to.be.instanceof(BC);
    expect(data.iv).to.be.instanceof(BC);

    expect(data.key.length).to.be.equal(32);
    expect(data.iv.length).to.be.equal(32);
  });

});
