const fs = require('fs');
const path = require('path');

const Executor = require('@sbx/json-rpc').Executor;
const BC = require('@sbx/common').BC;
const OperationHash = require('@sbx/common').Types.OperationHash;
const AccountNumber = require('@sbx/common').Types.AccountNumber;
const Account = require('@sbx/json-rpc').Types.Account;
const Block = require('@sbx/json-rpc').Types.Block;
const PublicKey = require('@sbx/common').Types.Keys.PublicKey;
const PrivateKey = require('@sbx/common').Types.Keys.PrivateKey;
const Currency = require('@sbx/common').Types.Currency;
const KeyPair = require('@sbx/common').Types.Keys.KeyPair;

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

const expect = chai.expect;

let getCallerInstance = () => {
  let FakeImmediateResponseCaller = {};

  FakeImmediateResponseCaller.call = (method, params) => {
    return new Promise((resolve, reject) => {
      // we will return the params to test
      resolve(params);
    });
  };

  return FakeImmediateResponseCaller;
};

let getErrorCallerInstance = () => {
  let FakeImmediateResponseCaller = {};

  FakeImmediateResponseCaller.call = (method, params) => {
    return new Promise((resolve, reject) => {
      // we will return the params to test
      reject({
        'code': 1005,
        'message': 'An error occured'
      });
    });
  };

  return FakeImmediateResponseCaller;
};

describe('RPC.Executor', () => {

  it.skip('transforms max, end, start, depth field to int', (done) => {
    const params = {
      max: '4', exp_max: 4,
      end: '4', exp_end: 4,
      start: '4', exp_start: 4,
      depth: '4', exp_depth: 4
    };
    const c = getCallerInstance();
    const exec = new Executor(c);

    exec.execute('foobar', params).then((usedParams) => {
      Object.keys(usedParams, (f) => {
        if (!f.startsWith('exp_')) {
          expect(usedParams[f]).to.be.equal(usedParams['exp_' + f]);
        }
      });

      done();
    });
  });

  it.skip('transforms fee, amount, price field to PASC', (done) => {
    const params = {
      fee: '100004.1', exp_fee: '100004.1',
      amount: 100004.12, exp_amount: '100004.12',
      price: '100004.1234', exp_price: '100004.1234'
    };
    const c = getCallerInstance();
    const exec = new Executor(c);

    exec.execute('foobar', params).then((usedParams) => {
      Object.keys(usedParams, (f) => {
        if (!f.startsWith('exp_')) {
          expect(usedParams[f]).to.be.equal(usedParams['exp_' + f]);
        }
      });

      done();
    });
  });

  it.skip('will throw an error if fee is vague', (done) => {
    const params = {
      fee: '100004.12345'
    };

    const c = getCallerInstance();
    const exec = new Executor(c);

    exec.execute('foobar', params)
      .catch(() => expect(true).to.be.true && done());
  });

  it.skip('will throw an error if amount is vague', (done) => {
    const params = {
      amount: '100004.12345'
    };

    const c = getCallerInstance();
    const exec = new Executor(c);

    exec.execute('foobar', params)
      .catch(() => expect(true).to.be.true && done());
  });

  it.skip('will throw an error if price is vague', (done) => {
    const params = {
      amount: '100004.12345'
    };

    const c = getCallerInstance();
    const exec = new Executor(c);

    exec.execute('foobar', params)
      .catch(() => expect(true).to.be.true && done());
  });

  it.skip('will transform a string payload to hex', (done) => {
    const params = {
      payload: 'test'
    };

    const c = getCallerInstance();
    const exec = new Executor(c);

    exec.execute('foobar', params)
      .then((p) => expect(p.payload).to.be.equal('74657374') && done());
  });

  it.skip('will keep boolean values as is', (done) => {
    const params = {
      field123: true,
      field456: false
    };

    const c = getCallerInstance();
    const exec = new Executor(c);

    exec.execute('foobar', params)
      .then((p) => {
        expect(p.field123).to.be.true &&
          expect(p.field456).to.be.false &&
          done();
      });
  });

  it.skip('will transform a bytecollection (BC) to hex', (done) => {
    const params = {
      field: BC.fromString('test')
    };

    const c = getCallerInstance();
    const exec = new Executor(c);

    exec.execute('foobar', params)
      .then((p) => {
        expect(p.field).to.be.equal(BC.fromString('test').toHex()) &&
          done();
      });
  });

  it.skip('will transform an ophash to hex', (done) => {
    const params = {
      field: new OperationHash(1, 2, 3, BC.fromHex('AB'.repeat(20)))
    };

    const c = getCallerInstance();
    const exec = new Executor(c);

    exec.execute('foobar', params)
      .then((p) => {
        expect(p.field).to.be.equal(params.field.encode().toHex()) &&
          done();
      });
  });

  it.skip('will extract the account number from an account', (done) => {
    const params = {
      field: new Account({
        account: 100,
        enc_pubkey: PublicKey.empty().encode(),
        balance: 1,
        n_operation: 1,
        updated_b: 1,
        state: 'normal',
        name: 'techworker',
        type: 0
      })
    };

    const c = getCallerInstance();
    const exec = new Executor(c);

    exec.execute('foobar', params)
      .then((p) => {
        expect(p.field).to.be.equal(100) &&
          done();
      });
  });

  it.skip('will extract the account number from an AccountNumber', (done) => {
    const params = {
      field: new AccountNumber(100)
    };

    const c = getCallerInstance();
    const exec = new Executor(c);

    exec.execute('foobar', params)
      .then((p) => {
        expect(p.field).to.be.equal(100) &&
          done();
      });
  });

  it.skip('will extract the block number from a block', (done) => {
    const blocks = JSON.parse(fs.readFileSync(path.join(__dirname, '/fixtures/blocks.json')));

    const params = {
      field: new Block(blocks[0])
    };

    const c = getCallerInstance();
    const exec = new Executor(c);

    exec.execute('foobar', params)
      .then((p) => {
        expect(p.field).to.be.equal(blocks[0].block) &&
          done();
      });
  });

  it.skip('will format a currency', (done) => {
    const params = {
      field: new Currency(1.2345)
    };

    const c = getCallerInstance();
    const exec = new Executor(c);

    exec.execute('foobar', params)
      .then((p) => {
        expect(p.field).to.be.equal('1.2345') &&
          done();
      });
  });

  it.skip('will throw an error with a vagues currency value', (done) => {
    const params = {
      field: new Currency(1.23456)
    };

    const c = getCallerInstance();
    const exec = new Executor(c);

    exec.execute('foobar', params)
      .catch(() => expect(true).to.be.true && done());
  });

  it.skip('will transform a BC pubkey', (done) => {
    const params = {
      pubkey: PublicKey.empty().encode()
    };

    const c = getCallerInstance();
    const exec = new Executor(c);

    exec.execute('foobar', params)
      .then((p) => {
        expect(p.enc_pubkey).to.be.equal(PublicKey.empty().encode().toHex()) &&
          done();
      });
  });
  it.skip('will transform a PublicKey pubkey', (done) => {
    const params = {
      pubkey: PublicKey.empty()
    };

    const c = getCallerInstance();
    const exec = new Executor(c);

    exec.execute('foobar', params)
      .then((p) => {
        expect(p.enc_pubkey).to.be.equal(PublicKey.empty().encode().toHex()) &&
          done();
      });
  });

  it.skip('will transform a KeyPair pubkey', (done) => {
    const params = {
      pubkey: new KeyPair(
        PrivateKey.decode(BC.fromHex('CA02200046B7A086680D208272F6982F574FE226042F30D049F9A226283FC3346506411D')),
        PublicKey.decode(BC.fromHex('CA0220006E75266E1865288874BFE1C3A9686BCF4D22CADCC250B134EA2C470A9E3F912B2000F8362CB5EE97113D93880303E99B63208CEBDB62D49874D739E33DFFFD3C4162'))
      )
    };

    const c = getCallerInstance();
    const exec = new Executor(c);

    exec.execute('foobar', params)
      .then((p) => {
        expect(p.enc_pubkey).to.be.equal('CA0220006E75266E1865288874BFE1C3A9686BCF4D22CADCC250B134EA2C470A9E3F912B2000F8362CB5EE97113D93880303E99B63208CEBDB62D49874D739E33DFFFD3C4162') &&
          done();
      });
  });

  it.skip('will transform a string pubkey to base58', (done) => {
    const params = {
      pubkey: '3GhhbopVb9wfo4HzecYwKYMWRvLCssTeFWjocfnWv12Yt3GtaW3seeatH9GqhVmnYrF586RKLwjFFMYn7Txq8X2D4qT7CbqrZgbdRm'
    };

    const c = getCallerInstance();
    const exec = new Executor(c);

    exec.execute('foobar', params)
      .then((p) => {
        expect(p.b58_pubkey).to.be.equal('3GhhbopVb9wfo4HzecYwKYMWRvLCssTeFWjocfnWv12Yt3GtaW3seeatH9GqhVmnYrF586RKLwjFFMYn7Txq8X2D4qT7CbqrZgbdRm') &&
          done();
      });
  });

  it.skip('will reject an error response with execute', (done) => {
    const c = getErrorCallerInstance();
    const exec = new Executor(c);

    exec.execute('foobar', {})
      .catch((error) => {
        expect(error.code).to.be.equal(1005) &&
          expect(error.message).to.be.equal('An error occured') &&
          done();
      });
  });

  it.skip('will reject an error response with executeAll', (done) => {
    const c = getErrorCallerInstance();
    const exec = new Executor(c);

    exec.execute('foobar', {})
      .catch((error) => {
        expect(error.code).to.be.equal(1005) &&
          expect(error.message).to.be.equal('An error occured') &&
          done();
      });
  });
});
