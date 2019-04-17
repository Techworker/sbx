const fs = require('fs');
const path = require('path');
const NodeServer = require('@pascalcoin-sbx/json-rpc').Types.NodeServer;
const chai = require('chai');

chai.expect();
const expect = chai.expect;

describe('Core.Types.NodeStatus.NodeServer', () => {
  it('can be created from a RPC response', () => {
    const raw = JSON.parse(fs.readFileSync(path.join(__dirname, '/../fixtures/nodestatus.json')));

    raw.nodeservers.forEach((nodeServer) => new NodeServer(nodeServer));
    expect(true).to.be.equal(true);
  });
  it('can be created from json and contains valid values', () => {
    const raw = JSON.parse(fs.readFileSync(path.join(__dirname, '/../fixtures/nodestatus.json')));

    raw.nodeservers.forEach((nodeServer) => {
      let ns = new NodeServer(nodeServer);

      expect(ns.ip).to.be.equal(nodeServer.ip);
      expect(ns.attempts).to.be.equal(nodeServer.attempts);
      expect(ns.lastcon).to.be.equal(nodeServer.lastcon);
      expect(ns.port).to.be.equal(nodeServer.port);
    });
  });
});
