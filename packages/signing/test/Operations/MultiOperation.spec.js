const BC = require('@pascalcoin-sbx/common').BC;
const RawCoder = require('@pascalcoin-sbx/signing').RawOperationsCoder;
const RawOps = require('@pascalcoin-sbx/signing').RawOperations;
const MultiOperation = require('@pascalcoin-sbx/signing').Operations.MultiOperation.Operation;
const Sender = require('@pascalcoin-sbx/signing').Operations.MultiOperation.Sender;
const Receiver = require('@pascalcoin-sbx/signing').Operations.MultiOperation.Receiver;
const Changer = require('@pascalcoin-sbx/signing').Operations.MultiOperation.Changer;
const PublicKeyCoder = require('@pascalcoin-sbx/common').Coding.Pascal.Keys.PublicKey;
const PublicKey = require('@pascalcoin-sbx/common').Types.Keys.PublicKey;

const chai = require('chai');
const expect = chai.expect;

let fixture = {
  senders: [
    {
      account: 1440500,
      amount: 0.0015,
      payload: 'test1',
      n_operation: 4004
    }
  ],
  receivers: [
    { account: 1440503, amount: 0.0007, payload: 'test2' },
    { account: 1440493, amount: 0.0008, payload: 'test3' }
  ],
  changesinfo: [ { account: 1440503, new_name: 'test123', n_operation: 1005 } ],
  rSender: '4B1992E286FD3879DD174E6BA8FAC9AAE8B3073319B937B28658253A22C824D9',
  sSender: '83CF0D3999E3855CF19E8222AFD0D8C7C4356426523EF5A35AA360A592391869',
  sChanger: '1740B3B656207EE28FFCA574288D2B4C31A95A6ACDD42133C6123F71D659DE0B',
  rChanger: 'A4338D74AF50CE8BE715524964B9F71B5D0B0EF0BCBC6FCDF19F5F16074727DF',
  raw: '010000000900000003000100F4FA15000F00000000000000A40F00000500746573743120004B1992E286FD3879DD174E6BA8FAC9AAE8B3073319B937B28658253A22C824D9200083CF0D3999E3855CF19E8222AFD0D8C7C4356426523EF5A35AA360A5923918690200EDFA1500080000000000000005007465737433F7FA15000700000000000000050074657374320100F7FA1500ED0300000200000000000007007465737431323300002000A4338D74AF50CE8BE715524964B9F71B5D0B0EF0BCBC6FCDF19F5F16074727DF20001740B3B656207EE28FFCA574288D2B4C31A95A6ACDD42133C6123F71D659DE0B'
};

describe('Operations.MultiOperation', () => {
  it('can be decode a signed operation', () => {
    let decoded = new RawCoder().decodeFromBytes(BC.fromHex(fixture.raw));

    expect(decoded.operations[0].operation.senders[0].r.toHex()).to.be.equal(fixture.rSender);
    expect(decoded.operations[0].operation.senders[0].s.toHex()).to.be.equal(fixture.sSender);
    expect(decoded.operations[0].operation.senders[0].account.account).to.be.equal(fixture.senders[0].account);
    expect(decoded.operations[0].operation.senders[0].amount.toStringOpt()).to.be.equal(fixture.senders[0].amount.toString());
    expect(decoded.operations[0].operation.senders[0].payload.toString()).to.be.equal(fixture.senders[0].payload);
    expect(decoded.operations[0].operation.senders[0].nOperation).to.be.equal(fixture.senders[0].n_operation);

    expect(decoded.operations[0].operation.receivers[1].account.account).to.be.equal(fixture.receivers[0].account);
    expect(decoded.operations[0].operation.receivers[1].amount.toStringOpt()).to.be.equal(fixture.receivers[0].amount.toString());
    expect(decoded.operations[0].operation.receivers[0].account.account).to.be.equal(fixture.receivers[1].account);
    expect(decoded.operations[0].operation.receivers[0].amount.toStringOpt()).to.be.equal(fixture.receivers[1].amount.toString());

    expect(decoded.operations[0].operation.changers[0].account.account).to.be.equal(fixture.changesinfo[0].account);
    expect(decoded.operations[0].operation.changers[0].newName.toString()).to.be.equal(fixture.changesinfo[0].new_name);
    expect(decoded.operations[0].operation.changers[0].nOperation).to.be.equal(fixture.changesinfo[0].n_operation);
  });

  it('can be decode signed operation and encode it again', () => {
    let decoded = new RawCoder().decodeFromBytes(BC.fromHex(fixture.raw));

    expect(new RawCoder().encodeToBytes(decoded).toHex()).to.be.equal(fixture.raw);
  });

  it('can be build by hand', () => {
    const op = new MultiOperation();

    fixture.senders.forEach((s) => {
      let sender = new Sender(s.account, s.amount);

      sender.withNOperation(s.n_operation);
      sender.withPayload(s.payload);
      sender.withSign(fixture.rSender, fixture.sSender);
      op.addSender(sender);
    });
    fixture.receivers.reverse().forEach((r) => {
      let receiver = new Receiver(r.account, r.amount);

      receiver.withPayload(r.payload);
      op.addReceiver(receiver);
    });
    fixture.changesinfo.forEach((c) => {
      let changer = new Changer(c.account);

      changer.withNOperation(c.n_operation);
      changer.withNewName(c.new_name);
      changer.withSign(fixture.rChanger, fixture.sChanger);
      op.addChanger(changer);
    });

    let encoded = new RawCoder().encodeToBytes(new RawOps().addMultiOperation(op));

    expect(encoded.toHex()).to.be.equal(fixture.raw);
  });
});
