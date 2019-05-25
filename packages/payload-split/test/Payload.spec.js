const BC = require('@pascalcoin-sbx/common').BC;
const PayloadSplit = require('@pascalcoin-sbx/payload-split');
const AES = require('@pascalcoin-sbx/crypto').Encryption.Pascal.Password;
const ECIES = require('@pascalcoin-sbx/crypto').Encryption.Pascal.ECIES;
const PrivateKeyCoder = require('@pascalcoin-sbx/crypto').Encryption.Pascal.PrivateKey;
const Keys = require('@pascalcoin-sbx/crypto').Keys;

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

const expect = chai.expect;

let keyPair256 = Keys.fromPrivateKey(
  PrivateKeyCoder.decrypt(
    '53616C7465645F5F7317EBF1F267E51B71C35B1F9B3E4EFD591A46F7F7E13154C509ED2CD7E58F0AC0FB1F54C99A7DF879E3584C0FF687D37B1A98D0181C84F3',
    {password: 'test123'}
  )
);

let keyPair384 = Keys.fromPrivateKey(
  PrivateKeyCoder.decrypt(
    '53616C7465645F5F748B02A8957AF0C0BE5BB39D7808E7B073F9DD836F2C9413F164CD0E51A8F899A1CA70BA61D003528B13CA9D5920834536BAC606869297ADADCAE38CF866983E1E0E768D5E41A350',
    {password: 'test123'}
  )
);

let keyPair521 = Keys.fromPrivateKey(
  PrivateKeyCoder.decrypt(
    '53616C7465645F5F714BBE9DEDA2312B97A47FBF738DB854E647B27864B5BBBCDB04AC9C3E51FDB203952EF7DE401236BC436C6CB2009140B6795C16A0C16F1D7B7E59300AA3439638428D309CFFE6A27C718D6D58EA712C05377B36ADA546A2',
    {password: 'test123'}
  )
);

describe('Payload', () => {

  it('can split a payload, encrypt it and decrypt it using AES', () => {
    let originalPayload = BC.from('test123'.repeat(100));
    let encrypted = PayloadSplit.splitAndEncrypt(originalPayload, AES, {password: 'test1234567890123'});
    encrypted.forEach(e => expect(e.length).to.be.below(257));
    let decrypted = PayloadSplit.decryptAndConcat(encrypted, AES, {password: 'test1234567890123'});
    expect(originalPayload.toHex()).to.be.equal(decrypted.toHex());
  });

  it('can encrypt a payload, split it and decrypt it using AES', () => {
    let originalPayload = BC.from('test123'.repeat(100));
    let encrypted = PayloadSplit.encryptAndSplit(originalPayload, AES, {password: 'test1234567890123'});
    encrypted.forEach(e => expect(e.length).to.be.below(257));
    let decrypted = PayloadSplit.concatAndDecrypt(encrypted, AES, {password: 'test1234567890123'});
    expect(originalPayload.toHex()).to.be.equal(decrypted.toHex());
  });

  it('can split a payload, encrypt it and decrypt it using ECIES(secp256)', () => {
    let originalPayload = BC.from('test123'.repeat(100));
    let encrypted = PayloadSplit.splitAndEncrypt(originalPayload, ECIES, {publicKey: keyPair256.publicKey});
    encrypted.forEach(e => expect(e.length).to.be.below(257));
    let decrypted = PayloadSplit.decryptAndConcat(encrypted, ECIES, {keyPair: keyPair256});
    expect(originalPayload.toHex()).to.be.equal(decrypted.toHex());
  });

  it('can encrypt a payload, split it and decrypt it using ECIES(secp256)', () => {
    let originalPayload = BC.from('test123'.repeat(100));
    let encrypted = PayloadSplit.encryptAndSplit(originalPayload, ECIES, {publicKey: keyPair256.publicKey});
    encrypted.forEach(e => expect(e.length).to.be.below(257));
    let decrypted = PayloadSplit.concatAndDecrypt(encrypted, ECIES, {keyPair: keyPair256});
    expect(originalPayload.toHex()).to.be.equal(decrypted.toHex());
  });

  it('can split a payload, encrypt it and decrypt it using ECIES(p384)', () => {
    let originalPayload = BC.from('test123'.repeat(100));
    let encrypted = PayloadSplit.splitAndEncrypt(originalPayload, ECIES, {publicKey: keyPair384.publicKey});
    encrypted.forEach(e => expect(e.length).to.be.below(257));
    let decrypted = PayloadSplit.decryptAndConcat(encrypted, ECIES, {keyPair: keyPair384});
    expect(originalPayload.toHex()).to.be.equal(decrypted.toHex());
  });

  it('can encrypt a payload, split it and decrypt it using ECIES(p384)', () => {
    let originalPayload = BC.from('test123'.repeat(100));
    let encrypted = PayloadSplit.encryptAndSplit(originalPayload, ECIES, {publicKey: keyPair384.publicKey});
    encrypted.forEach(e => expect(e.length).to.be.below(257));
    let decrypted = PayloadSplit.concatAndDecrypt(encrypted, ECIES, {keyPair: keyPair384});
    expect(originalPayload.toHex()).to.be.equal(decrypted.toHex());
  });

  it('can split a payload, encrypt it and decrypt it using ECIES(p521)', () => {
    let originalPayload = BC.from('test123'.repeat(100));
    let encrypted = PayloadSplit.splitAndEncrypt(originalPayload, ECIES, {publicKey: keyPair521.publicKey});
    encrypted.forEach(e => expect(e.length).to.be.below(257));
    let decrypted = PayloadSplit.decryptAndConcat(encrypted, ECIES, {keyPair: keyPair521});
    expect(originalPayload.toHex()).to.be.equal(decrypted.toHex());
  });

  it('can encrypt a payload, split it and decrypt it using ECIES(p521)', () => {
    let originalPayload = BC.from('test123'.repeat(100));
    let encrypted = PayloadSplit.encryptAndSplit(originalPayload, ECIES, {publicKey: keyPair521.publicKey});
    encrypted.forEach(e => expect(e.length).to.be.below(257));
    let decrypted = PayloadSplit.concatAndDecrypt(encrypted, ECIES, {keyPair: keyPair521});
    expect(originalPayload.toHex()).to.be.equal(decrypted.toHex());
  });
});
