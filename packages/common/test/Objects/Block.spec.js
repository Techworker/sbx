const fs = require('fs');
const path = require('path');
const Block = require('@pascalcoin-sbx/common').Objects.Block;
const PublicKey = require('@pascalcoin-sbx/common').Types.Keys.PublicKey;
const Currency = require('@pascalcoin-sbx/common').Types.Currency;
const AccountNumber = require('@pascalcoin-sbx/common').Types.AccountNumber;
const BC = require('@pascalcoin-sbx/common').BC;
const BN = require('bn.js');
const PublicKeyCoder = require('@pascalcoin-sbx/common').Coding.Pascal.Keys.PublicKey;

const pkCoder = new PublicKeyCoder();

const chai = require('chai');

chai.expect();
const expect = chai.expect;

describe('Core.Types.Block', () => {
  it('can be created from a RPC response', () => {

    const blocks = JSON.parse(fs.readFileSync(path.join(__dirname, '/../fixtures/blocks.json')));

    blocks.forEach((b) => new Block(b));
  });

  it('can be created from raw and contains valid values', () => {
    const blocks = JSON.parse(fs.readFileSync(path.join(__dirname, '/../fixtures/blocks.json')));

    blocks.forEach((b) => {
      let block = Block.createFromObject(b);

      expect(block.blockNumber).to.be.equal(b.block);
      expect(block.publicKey).to.be.instanceof(PublicKey);
      expect(pkCoder.encodeToBytes(block.publicKey).toHex()).to.be.equal(b.enc_pubkey);

      expect(block.reward).to.be.instanceof(Currency);
      expect(block.reward.toStringOpt()).to.be.equal(b.reward.toString());

      expect(block.fee).to.be.instanceof(Currency);
      expect(block.fee.toStringOpt()).to.be.equal(b.fee.toString());

      expect(block.protocolVersion).to.be.equal(b.ver);
      expect(block.minerVersion).to.be.equal(b.ver_a);
      expect(block.timestamp).to.be.equal(b.timestamp);
      expect(BN.isBN(block.target)).to.be.equal(true);
      expect(block.target.toString()).to.be.equal(b.target.toString());
      expect(BN.isBN(block.nonce)).to.be.equal(true);
      expect(block.nonce.toString()).to.be.equal(b.nonce.toString());
      expect(block.payload).to.be.equal(b.payload);
      expect(block.safeboxHash).to.be.instanceof(BC);
      expect(block.safeboxHash.toHex()).to.be.equal(b.sbh);
      expect(block.opHash).to.be.instanceof(BC);
      expect(block.opHash.toHex()).to.be.equal(b.oph);
      expect(block.proofOfWork).to.be.instanceof(BC);
      expect(block.proofOfWork.toHex()).to.be.equal(b.pow);

      expect(block.hashRateKhs.toString()).to.be.equal(b.hashratekhs.toString());

      expect(block.maturation).to.be.equal(b.maturation);
      if (b.countOperations === undefined) {
        expect(block.countOperations).to.be.equal(0);
      } else {
        expect(block.countOperations).to.be.equal(b.operations);
      }
    });
  });

  it('gets a list of created accounts in the block', () => {
    const blocks = JSON.parse(fs.readFileSync(path.join(__dirname, '/../fixtures/blocks.json')));

    blocks.forEach((b) => {
      let block = Block.createFromObject(b);
      let createdAccounts = block.createdAccountNumbers;

      expect(createdAccounts.length).to.be.equal(5);
      expect(createdAccounts[0]).to.be.instanceof(AccountNumber);
      expect(createdAccounts[0].account).to.be.equal(b.block * 5);
      expect(createdAccounts[1]).to.be.instanceof(AccountNumber);
      expect(createdAccounts[1].account).to.be.equal(b.block * 5 + 1);
      expect(createdAccounts[2]).to.be.instanceof(AccountNumber);
      expect(createdAccounts[2].account).to.be.equal(b.block * 5 + 2);
      expect(createdAccounts[3]).to.be.instanceof(AccountNumber);
      expect(createdAccounts[3].account).to.be.equal(b.block * 5 + 3);
      expect(createdAccounts[4]).to.be.instanceof(AccountNumber);
      expect(createdAccounts[4].account).to.be.equal(b.block * 5 + 4);
    });
  });

  it('saves all raw data in initialization data', () => {
    const blocks = JSON.parse(fs.readFileSync(path.join(__dirname, '/../fixtures/blocks.json')));

    blocks.forEach((b) => {
      let block = Block.createFromObject(b);

      expect(block.__initializationData).to.be.deep.equal(b);
    });
  });
});
