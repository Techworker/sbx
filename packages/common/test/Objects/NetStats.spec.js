const fs = require('fs');
const path = require('path');
const NetStats = require('@pascalcoin-sbx/common').Objects.NetStats;

const chai = require('chai');

chai.expect();
const expect = chai.expect;

describe('Core.Types.NodeStatus.NetStats', () => {
  it('can be created from a RPC response', () => {
    const raw = JSON.parse(fs.readFileSync(path.join(__dirname, '/../fixtures/nodestatus.json')));

    NetStats.createFromObject(raw.netstats);
  });

  it('can be created from json and contains valid values', () => {
    const raw = JSON.parse(fs.readFileSync(path.join(__dirname, '/../fixtures/nodestatus.json')));
    let ns = NetStats.createFromObject(raw.netstats);

    expect(ns.bytesReceived).to.be.equal(raw.netstats.breceived);
    expect(ns.bytesSent).to.be.equal(raw.netstats.bsend);

    expect(ns.countActiveConnections).to.be.equal(raw.netstats.active);
    expect(ns.countClientConnections).to.be.equal(raw.netstats.clients);
    expect(ns.countServerConnectionsWithResponse).to.be.equal(raw.netstats.servers);
    expect(ns.countServerConnections).to.be.equal(raw.netstats.servers_t);

    expect(ns.countTotalClientConnections).to.be.equal(raw.netstats.tclients);
    expect(ns.countTotalConnections).to.be.equal(raw.netstats.total);
    expect(ns.countTotalServerConnections).to.be.equal(raw.netstats.tservers);
  });
});
