const Operations = require('./src/Operations');

module.exports = {
  Signer: require('./src/Signer'),
  RawOperations: require('./src/RawOperations'),
  RawOperationsCoder: require('./src/RawOperationsCoder'),
  Coding: {
    PublicKeyWithLength: require('./src/Coding/PublicKeyWithLength')
  },
  Operations,
  /**
   *
   * @param signer
   * @param sender
   * @param target
   * @return {Data}
   */
  createDataOperation(signer, sender = null, target = null) {
    if (sender === null) {
      sender = signer;
    }

    if (target === null) {
      target = sender;
    }

    return new Operations.Data.Operation(signer, sender, target);
  }
};
