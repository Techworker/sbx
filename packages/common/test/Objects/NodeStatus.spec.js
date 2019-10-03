const fs = require('fs');
const path = require('path');
const NodeStatus = require('@pascalcoin-sbx/common').Objects.NodeStatus;
const NetProtocol = require('@pascalcoin-sbx/common').Objects.NetProtocol;
const NetStats = require('@pascalcoin-sbx/common').Objects.NetStats;
const NodeServer = require('@pascalcoin-sbx/common').Objects.NodeServer;
const BC = require('@pascalcoin-sbx/common').BC;

const chai = require('chai');

chai.expect();
const expect = chai.expect;

describe('Core.Types.NodeStatus', () => {
  it('can be created from a RPC response', () => {
    const raw = JSON.parse(fs.readFileSync(path.join(__dirname, '/../fixtures/nodestatus.json')));

    NodeStatus.createFromObject(raw);
  });

  it('can be created from json and contains valid values', () => {
    const raw = JSON.parse(fs.readFileSync(path.join(__dirname, '/../fixtures/nodestatus.json')));
    let ns = NodeStatus.createFromObject(raw);

    expect(ns.netProtocol).to.be.instanceof(NetProtocol);
    expect(ns.netStats).to.be.instanceof(NetStats);
    ns.nodeServers.forEach((nodeServer) => {
      expect(nodeServer).to.be.instanceof(NodeServer);
    });

    expect(ns.isReady).to.be.equal(raw.ready);
    expect(ns.readyString).to.be.equal(raw.ready_s);
    expect(ns.statusString).to.be.equal(raw.status_s);
    expect(ns.port).to.be.equal(raw.port);
    expect(ns.timestamp).to.be.equal(raw.timestamp);
    expect(ns.isLocked).to.be.equal(raw.locked);
    expect(ns.version).to.be.equal(raw.version);
    expect(ns.countBlocks).to.be.equal(raw.blocks);
    expect(ns.safeboxHash).to.be.instanceof(BC);
    expect(ns.safeboxHash.toHex()).to.be.equal(raw.sbh);
    expect(ns.proofOfWork).to.be.instanceof(BC);
    expect(ns.proofOfWork.toHex()).to.be.equal(raw.pow);
    expect(ns.opensslVersion).to.be.instanceof(BC);
    expect(ns.opensslVersion.toHex()).to.be.equal(raw.openssl);
  });

});
