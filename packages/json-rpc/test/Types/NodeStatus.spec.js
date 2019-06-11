const fs = require('fs');
const path = require('path');
const NodeStatus = require('@pascalcoin-sbx/json-rpc').Types.NodeStatus;
const NetProtocol = require('@pascalcoin-sbx/json-rpc').Types.NetProtocol;
const NetStats = require('@pascalcoin-sbx/json-rpc').Types.NetStats;
const NodeServer = require('@pascalcoin-sbx/json-rpc').Types.NodeServer;
const BC = require('@pascalcoin-sbx/common').BC;

const chai = require('chai');

chai.expect();
const expect = chai.expect;

describe('Core.Types.NodeStatus', () => {
  it('can be created from a RPC response', () => {
    const raw = JSON.parse(fs.readFileSync(path.join(__dirname, '/../fixtures/nodestatus.json')));

    NodeStatus.createFromRPC(raw);
  });

  it('can be created from json and contains valid values', () => {
    const raw = JSON.parse(fs.readFileSync(path.join(__dirname, '/../fixtures/nodestatus.json')));
    let ns = NodeStatus.createFromRPC(raw);

    expect(ns.netprotocol).to.be.instanceof(NetProtocol);
    expect(ns.netstats).to.be.instanceof(NetStats);
    ns.nodeservers.forEach((nodeServer) => {
      expect(nodeServer).to.be.instanceof(NodeServer);
    });

    expect(ns.ready).to.be.equal(raw.ready);
    expect(ns.readyS).to.be.equal(raw.ready_s);
    expect(ns.statusS).to.be.equal(raw.status_s);
    expect(ns.port).to.be.equal(raw.port);
    expect(ns.timestamp).to.be.equal(raw.timestamp);
    expect(ns.locked).to.be.equal(raw.locked);
    expect(ns.version).to.be.equal(raw.version);
    expect(ns.blocks).to.be.equal(raw.blocks);
    expect(ns.sbh).to.be.instanceof(BC);
    expect(ns.sbh.toHex()).to.be.equal(raw.sbh);
    expect(ns.pow).to.be.instanceof(BC);
    expect(ns.pow.toHex()).to.be.equal(raw.pow);
    expect(ns.openssl).to.be.instanceof(BC);
    expect(ns.openssl.toHex()).to.be.equal(raw.openssl);
  });

});
