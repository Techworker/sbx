const rpc = require('@pascalcoin-sbx/json-rpc').factory('http://127.0.0.1:4103');
const Common = require('@pascalcoin-sbx/common');
const Signing = require('@pascalcoin-sbx/signing');

const accounts = require('./_accounts');

const sendOpAttributes = {
  signerKeyPair: accounts.Account1.keyPair,
  sender: accounts.Account1.account,
  target: accounts.Account2.account,
  senderPubkey: accounts.Account1.publicKey,
  targetPubkey: accounts.Account2.publicKey,
  amount: 0.0002,
  payload: Common.BC.fromString('techworker'),
  nOperation: 1,
  fee: 0.0001
};

const sendRemoteOp = rpc.signSendTo({
  sender: sendOpAttributes.sender,
  target: sendOpAttributes.target,
  senderPubkey: sendOpAttributes.senderPubkey,
  targetPubkey: sendOpAttributes.targetPubkey,
  amount: sendOpAttributes.amount
});

sendRemoteOp.withPayload(sendOpAttributes.payload);
sendRemoteOp.withFee(sendOpAttributes.fee);
sendRemoteOp.withLastNOperation(sendOpAttributes.nOperation - 1);

(async() => {
  console.log('REMOTE: ' + (await sendRemoteOp.execute())[0].rawoperations);
})();

const sendLocalOp = Signing.send(sendOpAttributes.sender, sendOpAttributes.target, sendOpAttributes.amount);
sendLocalOp.withPayload(sendOpAttributes.payload);
sendLocalOp.withMinFee(sendOpAttributes.fee);
sendLocalOp.withNOperation(sendOpAttributes.nOperation);

console.log();
console.log('LOCAL:  ' + Signing.signAndGetRaw(sendOpAttributes.signerKeyPair, sendLocalOp).toHex());
