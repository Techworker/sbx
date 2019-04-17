const fs = require('fs');
const path = require('path');
const NetProtocol = require('@pascalcoin-sbx/json-rpc').Types.NetProtocol;

const chai = require('chai');

chai.expect();
const expect = chai.expect;

describe('Core.Types.NodeStatus.NetProtocol', () => {
  it('can be created from a RPC response', () => {
    const raw = JSON.parse(fs.readFileSync(path.join(__dirname, '/../fixtures/nodestatus.json')));

    new NetProtocol(raw.netprotocol);
  });

  it('can be created from json and contains valid values', () => {
    const raw = JSON.parse(fs.readFileSync(path.join(__dirname, '/../fixtures/nodestatus.json')));
    let np = new NetProtocol(raw.netprotocol);

    expect(np.ver).to.be.equal(raw.netprotocol.ver);
    expect(np.verA).to.be.equal(raw.netprotocol.ver_a);
  });

});
