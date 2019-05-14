const BC = require('@pascalcoin-sbx/common').BC;
const AccountNumberCoder = require('@pascalcoin-sbx/common').Coding.Pascal.AccountNumber;
const AccountNumber = require('@pascalcoin-sbx/common').Types.AccountNumber;
const chai = require('chai');
const expect = chai.expect;

describe('Coding.Pascal.AccountNumber', () => {
  it('can encode a pascalcoin account number', () => {
    expect(new AccountNumberCoder('name').encodeToBytes(new AccountNumber(1440490)).toHex()).to.be.equal('EAFA1500');
  });
  it('can decode a pascalcoin account number', () => {
    expect(new AccountNumberCoder('name').decodeFromBytes(BC.from('EAFA1500'))).to.be.instanceOf(AccountNumber);
    expect(new AccountNumberCoder('name').decodeFromBytes(BC.from('EAFA1500')).toString()).to.be.equal('1440490-43');
  });
});
