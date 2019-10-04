const BC = require('@pascalcoin-sbx/common').BC;
const CommonAccount = require('@pascalcoin-sbx/common').Objects.Account;
const Operation = require('./Operation');

const P_IND = Symbol('indyo');
const P_RPC = Symbol('rpc');

/**
 * Extended account object with various methods to resolve additional data from the chain.
 */
class Account extends CommonAccount {

  /**
   * Sets the indyo instance.
   *
   * @param {Indyo} indyo
   * @return {Account}
   */
  withIndyo(indyo) {
    this[P_IND] = indyo;
    this[P_RPC] = indyo.rpc;
    return this;
  }

  /**
   * Gets the operations of an account. If the amount and offset params are omitted,
   * all operations will be returned.
   *
   * @param {Number} offset
   * @param {Number} amount
   * @return {Promise}
   */
  async operations(amount = null, offset = null) {
    const action = this[P_RPC].getAccountOperations({
      account: this.accountNumber
    });

    return await this[P_IND].execute(action, Operation, amount, offset);
  }

  /**
   * Gets the block the account was last updated in.
   *
   * @return {Promise<void|Block>}
   */
  async updatedInBlock() {
    return this[P_IND].Blocks.findByBlockNumber(this.updatedInBlockNumber);
  }

  /**
   * Gets the block until the account is locked.
   *
   * @return {Promise<void|Block>}
   */
  async lockedUntilBlock() {
    return this[P_IND].Blocks.findByBlockNumber(this.lockedUntilBlockNumber);
  }

  /**
   * Gets the seller account in case the account is for sale.
   *
   * @return {Promise<void|Account>}
   */
  async sellerAccount() {
    return this[P_IND].Accounts.findByAccountNumber(this.sellerAccountNumber);
  }

  /**
   * Gets the receiver swap account instance in case this account is in account swap state.
   *
   * @return {Promise<void|Account>}
   */
  async receiverSwapAccount() {
    return this[P_IND].Accounts.findByAccountNumber(this.receiverSwapAccountNumber);
  }

  /**
   * Gets a list of all accounts with the same public key as the current account.
   *
   * @return {Promise<[]>}
   */
  async accountsWithSamePublicKey() {
    return this[P_IND].Accounts.findByPublicKey(this.publicKey);
  }

  /**
   * Returns a refreshed account instance.
   *
   * @return {Promise<void|Account>}
   */
  async refresh() {
    return this[P_IND].Accounts.findByAccountNumber(this.accountNumber);
  }

  /**
   *
   * @param {KeyPair} keyPair
   * @param {AccountNumber} receiverAccountNumber
   * @param {Currency} amount
   * @param {Payload} payload
   * @return {Promise<Operation>}
   */
  async send(keyPair, receiverAccountNumber, amount, payload) {
    return this[P_IND].Wallet.send(
      keyPair, this.accountNumber, receiverAccountNumber, amount, payload
    );
  }

  /**
   * Changes the key of the current account.
   *
   * @param {KeyPair} keyPair
   * @param {PublicKey} newPublicKey
   * @param {Payload} payload
   * @return {Promise<Operation>}
   */
  async changeKey(keyPair, newPublicKey, payload) {
    return this[P_IND].Wallet.changeKey(
      keyPair, this.accountNumber, this.accountNumber, newPublicKey, payload
    );
  }

  /**
   * Changes the info of an account.
   *
   * @param {KeyPair} keyPair
   * @param {Payload} payload
   * @param {Object} changes
   * @return {Promise<*|void|Account>}
   */
  async changeInfo(keyPair, payload, changes = {
    data: undefined,
    name: undefined,
    type: undefined,
    publicKey: undefined
  }) {
    return this[P_IND].Wallet.changeInfo(
      keyPair, this.accountNumber, this.accountNumber, payload, changes
    );
  }

  /**
   * Lists the account for public sale.
   *
   * @param {KeyPair} keyPair
   * @param {Currency} price
   * @param {AccountNumber} sellerAccountNumber
   * @param {Payload} payload
   * @return {Promise<*|void>}
   */
  async listForPublicSale(keyPair, price, sellerAccountNumber, payload) {
    return this[P_IND].Wallet.listForPublicSale(
      keyPair, this.accountNumber, this.accountNumber, price, sellerAccountNumber, payload
    );
  }

  /**
   * Lists the account for private sale.
   *
   * @param {KeyPair} keyPair
   * @param {Currency} price
   * @param {AccountNumber} sellerAccountNumber
   * @param {Payload} payload
   * @param {PublicKey} newPublicKey
   * @param {Number} lockedUntilBlock
   * @return {Promise<Operation>}
   */
  async listForPrivateSale(keyPair, price, sellerAccountNumber, payload, newPublicKey, lockedUntilBlock = 0) {
    return this[P_IND].Wallet.listForPrivateSale(
      keyPair, this.accountNumber, this.accountNumber, price, sellerAccountNumber, payload, newPublicKey, lockedUntilBlock
    );
  }

  /**
   * Initializes an account swap.
   *
   * @param {KeyPair} keyPair
   * @param {BC} hashLock
   * @param {Number} lockedUntilBlock
   * @param {PublicKey} newPublicKey
   * @param {Payload} payload
   * @return {Promise<Operation>}
   */
  async swap(keyPair, hashLock, lockedUntilBlock, newPublicKey, payload) {
    return this[P_IND].Wallet.swapAccount(
      keyPair, this.accountNumber, this.accountNumber, hashLock, lockedUntilBlock, newPublicKey, payload
    );
  }

  async swapCoin(keyPair, hashLock, payload) {
    hashLock = BC.from(hashLock);
    return this[P_IND].Wallet.swapCoin(
      keyPair, this.accountNumber, this.accountNumber, hashLock, payload
    );
  }

  /**
   * Delists the current account.
   *
   * @param {KeyPair} keyPair
   * @param {Payload} payload
   * @return {Promise<Operation>}
   */
  async delist(keyPair, payload) {
    return this[P_IND].Wallet.delist(
      keyPair, this.accountNumber, this.accountNumber, payload
    );
  }
}

module.exports = Account;
