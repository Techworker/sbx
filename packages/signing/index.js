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

  // functions
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

  /**
   * Creates a new changeKey operation.
   *
   * @param {AccountNumber} signer
   * @param {PublicKey} newPublicKey
   * @return {ChangeKey}
   */
  changeKey(signer, newPublicKey) {
    return new Operations.ChangeKey.Operation(signer, newPublicKey);
  },

  /**
   * Creates a new foreign signed key change operation.
   *
   * @param {AccountNumber} signer
   * @param {AccountNumber} target
   * @param {PublicKey} newPublicKey
   * @return {ChangeKeySigned}
   */
  changeKeySigned(signer, target, newPublicKey) {
    return new Operations.ChangeKeySigned.Operation(signer, target, newPublicKey);
  },

  /**
   * Creates a new operation to chenge the account info.
   *
   * @param {Account} signer
   * @param {Account} target
   * @return {ChangeAccountInfo}
   */
  changeAccountInfo(signer, target) {
    return new Operations.ChangeAccountInfo.Operation(signer, target);
  },

  /**
   * Creates a basic send operation.
   *
   * @param {AccountNumber} sender
   * @param {AccountNumber}target
   * @param {Currency} amount
   * @return {Transaction}
   */
  send(sender, target, amount) {
    return new Operations.Transaction.Operation(sender, target, amount);
  },

  /**
   * Creates a new operation to list an account for sale.
   *
   * @param {AccountNumber} signer
   * @param {AccountNumber} target
   * @param {Currency} price
   * @param {AccountNumber} accountToPay
   * @return {ListAccount}
   */
  list(signer, target, price, accountToPay) {
    return new Operations.ListAccount.Operation(signer, target, price, accountToPay);
  },

  /**
   * Delists a listed account for sale.
   *
   * @param {AccountNumber} signer
   * @param {AccountNumber} target
   * @return {DeListAccountForSale}
   */
  delist(signer, target) {
    return new Operations.DeListAccountForSale.Operation(signer, target);
  },

  /**
   * Buys an account that is for sale.
   *
   * @param {AccountNumber} sender
   * @param {AccountNumber} target
   * @param {Currency} amount
   * @param {Currency} price
   * @param {Currency} seller
   * @param [PublicKey} newPublicKey
   * @return {BuyAccount}
   */
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
