const BC = require('@pascalcoin-sbx/common').BC;
const AccountNameCoder = require('@pascalcoin-sbx/common').Coding.Pascal.AccountName;
const AccountName = require('@pascalcoin-sbx/common').Types.AccountName;
const chai = require('chai');
const expect = chai.expect;

describe('Coding.Pascal.AccountName', () => {
  it('can encode a pascalcoin account name', () => {
    expect(new AccountNameCoder('name').encodeToBytes(new AccountName('test')).toHex()).to.be.equal('0474657374');
  });
  it('can decode a pascalcoin account name', () => {
    expect(new AccountNameCoder('name').decodeFromBytes(BC.from('0474657374')).toString()).to.be.equal('test');
    expect(new AccountNameCoder('name').decodeFromBytes(BC.from('0474657374'))).to.be.instanceOf(AccountName);
  });
});
