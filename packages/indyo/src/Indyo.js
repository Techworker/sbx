const RPCClient = require('@pascalcoin-sbx/json-rpc').Client;
const AccountsRepository = require('./Repository/Accounts');
const BlocksRepository = require('./Repository/Blocks');
const OperationsRepository = require('./Repository/Operations');
const WalletRepository = require('./Repository/Wallet');

const P_ACCOUNTS_REPOSITORY = Symbol('accountsRepository');
const P_BLOCKS_REPOSITORY = Symbol('blocksRepository');
const P_OPERATIONS_REPOSITORY = Symbol('operationsRepository');
const P_WALLET_REPOSITORY = Symbol('walletRepository');
const P_RPC = Symbol('rpc');

/**
 * Indyo
 */
class Indyo {

  /**
   * Creates a new indyo instance with custom repositories.
   *
   * @param {Client} rpc
   * @param {AccountsRepository|null} accountsRepository
   * @param {BlocksRepository|null} blocksRepository
   * @param {OperationsRepository|null} operationsRepository
   * @param walletRepository
   * @return {Indyo}
   */
  static factoryDetailed(rpc,
    accountsRepository = null,
    blocksRepository = null,
    operationsRepository = null,
    walletRepository = null) {
    const instance = new Indyo(rpc);

    instance[P_ACCOUNTS_REPOSITORY] = accountsRepository;
    instance[P_BLOCKS_REPOSITORY] = blocksRepository;
    instance[P_OPERATIONS_REPOSITORY] = operationsRepository;
    instance[P_WALLET_REPOSITORY] = walletRepository;

    return instance;
  }

  /**
   * Fast track new indyo instance.
   *
   * @param {String} rpcHost
   * @return {Indyo}
   */
  static factory(rpcHost = 'http://127.0.0.1:4103') {
    return new Indyo(RPCClient.factory(rpcHost));
  }

  /**
   * Constructor
   *
   * @param {Client} rpc
   */
  constructor(rpc) {
    this[P_RPC] = rpc;

    this[P_ACCOUNTS_REPOSITORY] = null;
    this[P_BLOCKS_REPOSITORY] = null;
    this[P_OPERATIONS_REPOSITORY] = null;
    this[P_WALLET_REPOSITORY] = null;
  }

  /**
   * Gets the rpc instance.
   *
   * @return {Client}
   */
  get rpc() {
    return this[P_RPC];
  }

  /**
   * Gets the accounts repository.
   *
   * @return {AccountsRepository}
   */
  get Accounts() {
    if (this[P_ACCOUNTS_REPOSITORY] === null) {
      this[P_ACCOUNTS_REPOSITORY] = new AccountsRepository(this);
    }

    return this[P_ACCOUNTS_REPOSITORY];
  }

  /**
   * Gets the accounts repository.
   *
   * @return {BlocksRepository}
   */
  get Blocks() {
    if (this[P_BLOCKS_REPOSITORY] === null) {
      this[P_BLOCKS_REPOSITORY] = new BlocksRepository(this);
    }

    return this[P_BLOCKS_REPOSITORY];
  }

  /**
   * Gets the operations repository.
   *
   * @return {OperationsRepository}
   */
  get Operations() {
    if (this[P_OPERATIONS_REPOSITORY] === null) {
      this[P_OPERATIONS_REPOSITORY] = new OperationsRepository(this);
    }

    return this[P_OPERATIONS_REPOSITORY];
  }

  /**
   * Gets the operations repository.
   *
   * @return {OperationsRepository}
   */
  get Wallet() {
    if (this[P_WALLET_REPOSITORY] === null) {
      this[P_WALLET_REPOSITORY] = new WalletRepository(this);
    }

    return this[P_WALLET_REPOSITORY];
  }

  /**
   * Executes an rpc action and transforms the result.
   *
   * @param {BaseAction} action
   * @param destinationType
   * @return {Promise<Operation|Changer|Sender|Receiver|Block|Account>}
   */
  async executeAndTransform(action, destinationType = null) {
    let result, transform;

    if (destinationType !== null) {
      action = action.withDestinationType(destinationType);
    }

    [result, transform] = await action.execute();
    if (Array.isArray(result)) {
      return transform(result).map(o => {
        return o.withIndyo(this);
      });
    }

    return transform(result).withIndyo(this);
  }

  async executeAllAndTransform(action, destinationType = null) {
    let result, transform;

    if (destinationType !== null) {
      action = action.withDestinationType(destinationType);
    }

    [result, transform] = await action.executeAll();
    return transform(result).map(o => {
      return o.withIndyo(this);
    });
  }

  async execute(action, destinationType = null, amount = null, offset = null) {
    if (offset !== null && amount !== null) {
      action.withStart(offset);
      action.withMax(amount);
      return await this.executeAndTransform(action, destinationType);
    }

    return await this.executeAllAndTransform(action, destinationType);
  }
}

module.exports = Indyo;
