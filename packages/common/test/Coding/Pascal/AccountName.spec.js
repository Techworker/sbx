const BC = require('@pascalcoin-sbx/common').BC;
const AccountNameCoder = require('@pascalcoin-sbx/common').Coding.Pascal.AccountName;
const AccountName = require('@pascalcoin-sbx/common').Types.AccountName;
const chai = require('chai');
const expect = chai.expect;

describe('Coding.Pascal.AccountName', () => {
  it('can encode a pascalcoin account name', () => {
    expect(new AccountNameCoder('name').encodeToBytes(new AccountName('test')).toHex()).to.be.equal('040074657374');
    expect(new AccountNameCoder('name', 1).encodeToBytes(new AccountName('test')).toHex()).to.be.equal('0474657374');
  });
  it('can decode a pascalcoin account name', () => {
    expect(new AccountNameCoder('name').decodeFromBytes(BC.from('040074657374')).toString()).to.be.equal('test');
    expect(new AccountNameCoder('name').decodeFromBytes(BC.from('040074657374'))).to.be.instanceOf(AccountName);
    expect(new AccountNameCoder('name', 1).decodeFromBytes(BC.from('0474657374')).toString()).to.be.equal('test');
    expect(new AccountNameCoder('name', 1).decodeFromBytes(BC.from('0474657374'))).to.be.instanceOf(AccountName);
  });
  it('will assign a default id', () => {
    expect(new AccountNameCoder().id).to.be.equal('account_name_16');
    expect(new AccountNameCoder(false).id).to.be.equal('account_name_16');
    expect(new AccountNameCoder(false, 1).id).to.be.equal('account_name_8');
    expect(new AccountNameCoder(false, 2).id).to.be.equal('account_name_16');
    expect(new AccountNameCoder(false, 4).id).to.be.equal('account_name_32');
  });
});
