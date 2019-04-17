const fs = require('fs');
const path = require('path');
const NetStats = require('@pascalcoin-sbx/json-rpc').Types.NetStats;

const chai = require('chai');

chai.expect();
const expect = chai.expect;

describe('Core.Types.NodeStatus.NetStats', () => {
  it('can be created from a RPC response', () => {
    const raw = JSON.parse(fs.readFileSync(path.join(__dirname, '/../fixtures/nodestatus.json')));

    new NetStats(raw.netstats);
  });

  it('can be created from json and contains valid values', () => {
    const raw = JSON.parse(fs.readFileSync(path.join(__dirname, '/../fixtures/nodestatus.json')));
    let ns = new NetStats(raw.netstats);

    expect(ns.active).to.be.equal(raw.netstats.active);
    expect(ns.breceived).to.be.equal(raw.netstats.breceived);
    expect(ns.bsend).to.be.equal(raw.netstats.bsend);
    expect(ns.clients).to.be.equal(raw.netstats.clients);
    expect(ns.servers).to.be.equal(raw.netstats.servers);
    expect(ns.serversT).to.be.equal(raw.netstats.servers_t);
    expect(ns.tclients).to.be.equal(raw.netstats.tclients);
    expect(ns.total).to.be.equal(raw.netstats.total);
    expect(ns.tservers).to.be.equal(raw.netstats.tservers);
  });
});
