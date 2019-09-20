const BC = require('@pascalcoin-sbx/common').BC;
const CurrencyCoder = require('@pascalcoin-sbx/common').Coding.Pascal.Currency;
const Currency = require('@pascalcoin-sbx/common').Types.Currency;
const chai = require('chai');
const expect = chai.expect;

describe('Coding.Pascal.Currency', () => {
  it('can encode a pascalcoin currency', () => {
    expect(new CurrencyCoder('test').encodeToBytes(new Currency(0.0015)).toHex()).to.be.equal('0F00000000000000');
  });
  it('can decode a pascalcoin currency', () => {
    expect(new CurrencyCoder('test').decodeFromBytes(BC.from('0F00000000000000')).toString()).to.be.equal('0.0015');
    expect(new CurrencyCoder('test').decodeFromBytes(BC.from('0474657374'))).to.be.instanceOf(Currency);
  });
  it('will assign a default id', () => {
    expect(new CurrencyCoder().id).to.be.equal('currency');
  });
});
