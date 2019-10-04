const Account = require('./../Objects/Account');
const Operation = require('./../Objects/Operation');
const Signing = require('@pascalcoin-sbx/signing');

const P_IND = Symbol('indyo');
const P_RPC = Symbol('rpc');

const M_SIGN_AND_EXECUTE = Symbol('signAndExecute');

class Wallet {
  /**
   * Constructor
   *
   * @param {Indyo} indyo
   */
  constructor(indyo) {
    this[P_IND] = indyo;
    this[P_RPC] = indyo.rpc;
  }

  /**
   * Changes the key of the given account.
   *
   * @param {KeyPair} signerKeyPair
   * @param {AccountNumber} signerAccountNumber
   * @param {AccountNumber} targetAccountNumber
   * @param {PublicKey} newPublicKey
   * @param {Payload} payload
   * @return {Promise<void>}
   */
  async changeKey(signerKeyPair, signerAccountNumber, targetAccountNumber, newPublicKey, payload) {
    // determine the sender account
    let senderAccount = await this[P_IND].Accounts.findByAccountNumber(targetAccountNumber);

    // create new local op
    let changeKeyOp;

    if (signerAccountNumber === targetAccountNumber) {
      changeKeyOp = Signing.changeKey(targetAccountNumber, newPublicKey);
    } else {
      changeKeyOp = Signing.changeKeySigned(signerAccountNumber, targetAccountNumber, newPublicKey);
    }

    changeKeyOp.withPayload(payload);
    changeKeyOp.withNOperation(senderAccount.nOperation + 1);

    return await this[M_SIGN_AND_EXECUTE](signerKeyPair, changeKeyOp);
  }

  /**
   * Tries to find an account by its account number.
   *
   * @return {Promise<void>|Account}
   * @param {KeyPair} senderKeyPair
   * @param {AccountNumber} senderAccountNumber
   * @param {AccountNumber} targetAccountNumber
   * @param {Currency} amount
   * @param {Payload} payload
   */
  async send(senderKeyPair, senderAccountNumber, targetAccountNumber, amount, payload) {

    // determine the sender account
    let senderAccount = await this[P_IND].Accounts.findByAccountNumber(senderAccountNumber);

    // create new local op
    const sendLocalOp = new Signing.Operations.Transaction.Operation(senderAccountNumber, targetAccountNumber, amount);

    sendLocalOp.withPayload(payload);
    sendLocalOp.withNOperation(senderAccount.nOperation + 1);

    return await this[M_SIGN_AND_EXECUTE](senderKeyPair, sendLocalOp);
  }

  /**
   * Tries to find an account by its account number.
   *
   * @return {Promise<void>|Account}
   * @param {KeyPair} signerKeyPair
   * @param {AccountNumber} signerAccountNumber
   * @param {AccountNumber} targetAccountNumber
   * @param {Payload} payload
   * @param {Object} changes
   */
  async changeInfo(signerKeyPair, signerAccountNumber, targetAccountNumber, payload,
    changes = { data: undefined, name: undefined, type: undefined, publicKey: undefined}
  ) {

    // determine the sender account
    let signerAccount = await this[P_IND].Accounts.findByAccountNumber(signerAccountNumber);

    // create new local op
    const changeInfoLocalOp = new Signing.Operations.ChangeAccountInfo.Operation(
      signerAccountNumber, targetAccountNumber
    );

    if (changes.data !== undefined) {
      changeInfoLocalOp.withNewData(changes.data);
    }
    if (changes.name !== undefined) {
      changeInfoLocalOp.withNewName(changes.name);
    }
    if (changes.type !== undefined) {
      changeInfoLocalOp.withNewType(changes.type);
    }
    if (changes.publicKey !== undefined) {
      changeInfoLocalOp.withNewPublicKey(changes.publicKey);
    }

    changeInfoLocalOp.withPayload(payload);
    changeInfoLocalOp.withNOperation(signerAccount.nOperation + 1);

    return await this[M_SIGN_AND_EXECUTE](signerKeyPair, changeInfoLocalOp);
  }

  /**
   * Lists an account for public sale.
   *
   * @param {KeyPair} signerKeyPair
   * @param {AccountNumber} signerAccountNumber
   * @param {AccountNumber} targetAccountNumber
   * @param {Currency} price
   * @param {AccountNumber} sellerAccountNumber
   * @param {Payload} payload
   * @return {Promise<void>}
   */
  async listForPublicSale(signerKeyPair, signerAccountNumber, targetAccountNumber,
    price, sellerAccountNumber, payload) {

    // determine the sender account
    let signerAccount = await this[P_IND].Accounts.findByAccountNumber(signerAccountNumber);

    // create new local op
    const listForSaleLocalOp = new Signing.Operations.ListAccountForSale.Operation(
      signerAccountNumber, targetAccountNumber, price, sellerAccountNumber
    );

    listForSaleLocalOp.withPayload(payload);
    listForSaleLocalOp.withNOperation(signerAccount.nOperation + 1);

    return await this[M_SIGN_AND_EXECUTE](signerKeyPair, listForSaleLocalOp);
  }

  /**
   * Lists an account for public sale.
   *
   * @param {KeyPair} signerKeyPair
   * @param {AccountNumber} signerAccountNumber
   * @param {AccountNumber} targetAccountNumber
   * @param {Currency} price
   * @param {AccountNumber} sellerAccountNumber
   * @param {PublicKey} newPublicKey
   * @param {Payload} payload
   * @param {Number|0} lockedUntilBlock
   * @return {Promise<void>}
   */
  async listForPrivateSale(signerKeyPair, signerAccountNumber, targetAccountNumber,
    price, sellerAccountNumber, payload, newPublicKey,
    lockedUntilBlock = 0) {

    // determine the sender account
    let signerAccount = await this[P_IND].Accounts.findByAccountNumber(signerAccountNumber);

    // create new local op
    const listForSaleLocalOp = new Signing.Operations.ListAccount.Operation(
      signerAccountNumber, targetAccountNumber, price, sellerAccountNumber
    );

    listForSaleLocalOp.withPayload(payload);
    listForSaleLocalOp.withNOperation(signerAccount.nOperation + 1);
    listForSaleLocalOp.asPrivateSale(newPublicKey, lockedUntilBlock);

    return await this[M_SIGN_AND_EXECUTE](signerKeyPair, listForSaleLocalOp);
  }

  /**
   * Lists an account for public sale.
   *
   * @param {KeyPair} signerKeyPair
   * @param {AccountNumber} signerAccountNumber
   * @param {AccountNumber} targetAccountNumber
   * @return {Promise<void>}
   */
  async delist(signerKeyPair, signerAccountNumber, targetAccountNumber, payload) {

    // determine the sender account
    let signerAccount = await this[P_IND].Accounts.findByAccountNumber(signerAccountNumber);

    // create new local op
    const deListLocalOp = new Signing.Operations.DeListAccount.Operation(
      signerAccountNumber, targetAccountNumber
    );

    deListLocalOp.withPayload(payload);
    deListLocalOp.withNOperation(signerAccount.nOperation + 1);

    return await this[M_SIGN_AND_EXECUTE](signerKeyPair, deListLocalOp);
  }

  /**
   * Lists an account for public sale.
   *
   * @param {KeyPair} signerKeyPair
   * @param {AccountNumber} signerAccountNumber
   * @param {AccountNumber} targetAccountNumber
   * @param {BC} hashLock
   * @param {Number|0} lockedUntilBlock
   * @return {Promise<void>}
   */
  async swapAccount(signerKeyPair, signerAccountNumber, targetAccountNumber, hashLock, lockedUntilBlock, newPublicKey, payload) {

    // determine the sender account
    let signerAccount = await this[P_IND].Accounts.findByAccountNumber(signerAccountNumber);

    // create new local op
    const listForAccountSwapLocalOp = new Signing.Operations.ListAccount.Operation(
      signerAccountNumber, targetAccountNumber, 0, 0
    );

    listForAccountSwapLocalOp.asAccountSwap(hashLock, lockedUntilBlock, newPublicKey);
    listForAccountSwapLocalOp.withPayload(payload);
    listForAccountSwapLocalOp.withNOperation(signerAccount.nOperation + 1);
    return await this[M_SIGN_AND_EXECUTE](signerKeyPair, listForAccountSwapLocalOp);
  }

  /**
   * Lists an account for public sale.
   *
   * @param {KeyPair} signerKeyPair
   * @param {AccountNumber} signerAccountNumber
   * @param {AccountNumber} targetAccountNumber
   * @param {BC} hashLock
   * @param {Number|0} lockedUntilBlock
   * @return {Promise<void>}
   */
  async swapCoin(signerKeyPair, signerAccountNumber, targetAccountNumber, hashLock, payload) {

    // determine the sender account
    let signerAccount = await this[P_IND].Accounts.findByAccountNumber(signerAccountNumber);

    // create new local op
    const listForAccountSwapLocalOp = new Signing.Operations.ListAccount.Operation(
      signerAccountNumber, targetAccountNumber, 0, 0
    );

    listForAccountSwapLocalOp.asCoinSwap(hashLock);
    listForAccountSwapLocalOp.withPayload(payload);
    listForAccountSwapLocalOp.withNOperation(signerAccount.nOperation + 1);
    return await this[M_SIGN_AND_EXECUTE](signerKeyPair, listForAccountSwapLocalOp);
  }

  /**
   * Signs and executes the given op. If it fails without fee, it will retry with a fee.
   *
   * @param {KeyPair} keyPair
   * @param {BaseOperation} op
   * @return {Promise<Operation>}
   */
  async [M_SIGN_AND_EXECUTE](keyPair, op) {
    // sign operation using the key
    let raw = Signing.signAndGetRaw(keyPair, op);

    // try to execute the operation
    let resultingOperations = await this[P_IND].executeAndTransform(
      this[P_RPC].executeOperations({rawoperations: raw}), Operation
    );

    // invalid? try with fee
    if (!resultingOperations[0].isValid) {
      op.resetSign();
      op.withMinFee();
      raw = Signing.signAndGetRaw(keyPair, op);

      return this[P_IND].executeAndTransform(
        this[P_RPC].executeOperations({rawoperations: raw}), Operation
      );
    }

    if (Array.isArray(resultingOperations) && resultingOperations.length > 0) {
      return resultingOperations[0];
    }

    return resultingOperations;
  }
}

module.exports = Wallet;
