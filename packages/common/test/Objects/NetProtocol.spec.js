const fs = require('fs');
const path = require('path');
const NetProtocol = require('@pascalcoin-sbx/common').Objects.NetProtocol;

const chai = require('chai');

chai.expect();
const expect = chai.expect;

describe('Core.Types.NodeStatus.NetProtocol', () => {
  it('can be created from a RPC response', () => {
    const raw = JSON.parse(fs.readFileSync(path.join(__dirname, '/../fixtures/nodestatus.json')));

    NetProtocol.createFromObject(raw.netprotocol);
  });

  it('can be created from json and contains valid values', () => {
    const raw = JSON.parse(fs.readFileSync(path.join(__dirname, '/../fixtures/nodestatus.json')));
    let np = NetProtocol.createFromObject(raw.netprotocol);

    expect(np.version).to.be.equal(raw.netprotocol.ver);
    expect(np.versionAvailable).to.be.equal(raw.netprotocol.ver_a);
  });

});
