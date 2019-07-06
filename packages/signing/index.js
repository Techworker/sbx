const Operations = require('./src/Operations');
const RawOperations = require('./src/RawOperations');
const RawOperationsCoder = require('./src/RawOperationsCoder');

module.exports = {
  Signer: require('./src/Signer'),
  RawOperations,
  RawOperationsCoder,
  Coding: {
    PublicKeyWithLength: require('./src/Coding/PublicKeyWithLength')
  },
  Operations,

  /**
   * Creates a new data operation.
   *
   * @param signer
   * @param sender
   * @param target
   * @return {Data}
   */
  data(signer, sender = null, target = null) {
    return new Operations.Data.Operation(signer, sender, target);
  },

  changeKey(signer, newPublicKey) {
    return new Operations.ChangeKey.Operation(signer, newPublicKey);
  },
  changeKeySigned(signer, target, newPublicKey) {
    return new Operations.ChangeKeySigned.Operation(signer, target, newPublicKey);
  },
  changeAccountInfo(signer, target) {
    return new Operations.ChangeAccountInfo.Operation(signer, target);
  },
  transaction(sender, target, amount) {
    return new Operations.Transaction.Operation(sender, target, amount);
  },
  list(signer, target, price, accountToPay) {
    return new Operations.ListAccountForSale.Operation(signer, target, price, accountToPay);
  },
  delist(signer, target) {
    return new Operations.DeListAccountForSale.Operation(signer, target);
  },
  buy(sender, target, amount, price, seller, newPublicKey) {
    return new Operations.BuyAccount.Operation(sender, target, amount, price, seller, newPublicKey);
  },

  /**
   * Signs the given operation with the given operation and returns the rawops.
   *
   * @param {KeyPair} keyPair
   * @param {Abstract} operation
   * @return {BC}
   */
  signAndGetRaw(keyPair, operation) {
    // collect offline signed operation (one could sign multiple at once)
    const operations = new RawOperations();

    operations.addOperation(keyPair, operation);

    // send locally signed operation(s) to node
    return new RawOperationsCoder().encodeToBytes(operations);
  }
};
