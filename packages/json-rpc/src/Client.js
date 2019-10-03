/**
* Copyright (c) Benjamin Ansbach - all rights reserved.
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

const Executor = require('./Executor');
const RPCCaller = require('./Caller');
const BaseAction = require('./Actions/BaseAction');
const PagedAction = require('./Actions/PagedAction');
const OperationAction = require('./Actions/OperationAction');
const SignOperationAction = require('./Actions/SignOperationAction');

const Account = require('@pascalcoin-sbx/common').Objects.Account;
const Block = require('@pascalcoin-sbx/common').Objects.Block;
const SignedOperation = require('@pascalcoin-sbx/common').Objects.SignedOperation;

const AccountNameSearchType = require('./Types/AccountNameSearchType');
const AccountStatusSearchType = require('./Types/AccountStatusSearchType');

const SignedMessage = require('@pascalcoin-sbx/common').Objects.SignedMessage;
const NodeStatus = require('@pascalcoin-sbx/common').Objects.NodeStatus;
const Operation = require('@pascalcoin-sbx/common').Objects.Operation;
const Sender = require('@pascalcoin-sbx/common').Objects.Sender;
const Receiver = require('@pascalcoin-sbx/common').Objects.Receiver;
const Changer = require('@pascalcoin-sbx/common').Objects.Changer;
const Connection = require('@pascalcoin-sbx/common').Objects.Connection;
const WalletPublicKey = require('@pascalcoin-sbx/common').Objects.WalletPublicKey;
const AccountName = require('@pascalcoin-sbx/common').Types.AccountName;
const AccountNumber = require('@pascalcoin-sbx/common').Types.AccountNumber;
const OperationHash = require('@pascalcoin-sbx/common').Types.OperationHash;
const Currency = require('@pascalcoin-sbx/common').Types.Currency;
const BC = require('@pascalcoin-sbx/common').BC;

const P_EXECUTOR = Symbol('executor');

/**
* A simple rpc client that will prepare an action that can be executed against
* a node.
*/
class Client {

  /**
   * Returns a standard instance pointing to the given rpc host node.
   *
   * @param {String} rpcHostAddress
   * @returns {Client}
   */
  static factory(rpcHostAddress) {
    return new Client(
      new Executor(
        new RPCCaller(rpcHostAddress),
      ),
    );
  }

  /**
   * Constructor
   *
   * @param {Executor} executor
   */
  constructor(executor) {
    this[P_EXECUTOR] = executor;
  }

  /**
   * Adds nodes the remote node should connect to.
   *
   * @param {String[]} nodes - The list of nodes (will be transformed to a semicolon separated list)
   *
   * @returns {BaseAction}
   */
  addNode({
    nodes
  }) {
    return new BaseAction('addnode', {
      nodes: nodes.join(';')
    }, this[P_EXECUTOR], Number, false);
  }

  /**
   * Gets an account with the given account number.
   *
   * @param {AccountNumber|Number|String} account
   *
   * @returns {BaseAction}
   */
  getAccount({
    account
  }) {
    return new BaseAction('getaccount', {
      account: new AccountNumber(account)
    }, this[P_EXECUTOR], Account, false);
  }

  /**
   * Searches for accounts.
   *
   * @param {AccountName|String|null} name
   * @param {Number|null} type
   * @param {Boolean|null} onlyAccountsForSale
   * @param {Boolean|null} exact
   * @param {Currency|null} minBalance
   * @param {Currency|null} maxBalance
   * @param {String|BC|PublicKey|WalletPublicKey|PrivateKey|KeyPair|null} pubkey
   *
   * @returns {PagedAction}
   */
  findAccounts({
    name = null,
    namesearchtype = null,
    type = null,
    minBalance = null,
    maxBalance = null,
    pubkey = null,
    statustype = null
  }) {
    return new PagedAction('findaccounts', {
      name: name !== null ? new AccountName(name) : name,
      namesearchtype,
      type: type !== null ? parseInt(type, 10) : type,
      min_balance: minBalance !== null ? new Currency(minBalance) : minBalance,
      max_balance: maxBalance !== null ? new Currency(maxBalance) : maxBalance,
      pubkey,
      statustype
    }, this[P_EXECUTOR], Account, true);
  }

  /**
   * Returns all accounts of a wallet with the given public key
   *
   * @param {String|BC|PublicKey|WalletPublicKey|PrivateKey|KeyPair|null} pubkey
   *
   * @returns {PagedAction}
   */
  getWalletAccounts({
    pubkey = null
  }) {
    return new PagedAction('getwalletaccounts', {
      pubkey
    }, this[P_EXECUTOR], Account, true);
  }

  /**
   * Returns the number of accounts in a wallet
   *
   * @param {String|BC|PublicKey|WalletPublicKey|PrivateKey|KeyPair|null} pubkey
   *
   * @returns {BaseAction}
   */
  getWalletAccountsCount({
    pubkey = null
  }) {
    return new BaseAction('getwalletaccountscount', {
      pubkey
    }, this[P_EXECUTOR], Number, false);
  }

  /**
   * Gets the accumulated balance of accounts in a wallet
   *
   * @param {String|BC|PublicKey|WalletPublicKey|PrivateKey|KeyPair|null} pubkey
   *
   * @returns {BaseAction}
   */
  getWalletCoins({
    pubkey = null
  }) {
    return new BaseAction('getwalletcoins', {
      pubkey
    }, this[P_EXECUTOR], Number, false);
  }

  /**
   * Gets the list of public keys managed in a wallet
   *
   * @param {String|BC|PublicKey|WalletPublicKey|PrivateKey|KeyPair|null} pubkey
   *
   * @returns {PagedAction}
   */
  getWalletPubKeys({
    pubkey = null
  }) {
    return new PagedAction('getwalletpubkeys', {
      pubkey
    }, this[P_EXECUTOR], WalletPublicKey, true);
  }

  /**
   * Gets the info of a public key in the wallet.
   *
   * @param {String|BC|PublicKey|WalletPublicKey|PrivateKey|KeyPair} pubkey
   *
   * @returns {BaseAction}
   */
  getWalletPubKey({
    pubkey
  }) {
    return new BaseAction('getwalletpubkey', {
      pubkey
    }, this[P_EXECUTOR], WalletPublicKey, true);
  }

  /**
   * Imports a public key in the wallet.
   *
   * @param {String|BC|PublicKey|WalletPublicKey|PrivateKey|KeyPair} pubkey
   * @param {String|null} name
   *
   * @returns {BaseAction}
   */
  inportPubKey({
    pubkey,
    name = null
  }) {
    return new BaseAction('importpubkey', {
      pubkey,
      name
    }, this[P_EXECUTOR], WalletPublicKey, false);
  }

  /**
   * Gets the information of a block
   *
   * @param {Number} block
   *
   * @returns {BaseAction}
   */
  getBlock({
    block
  }) {
    return new BaseAction('getblock', {
      block: block !== null ? parseInt(block, 10) : block
    }, this[P_EXECUTOR], Block, false);
  }

  /**
   * Gets a list of blocks
   *
   * @param {Number|null} last
   * @param {Number|null} start
   * @param {Number|null} end
   *
   * @returns {BaseAction}
   */
  getBlocks({
    last = null,
    start = null,
    end = null
  }) {
    return new BaseAction('getblocks', {
      last: last !== null ? parseInt(last, 10) : last,
      start: start !== null ? parseInt(start, 10) : start,
      end: end !== null ? parseInt(end, 10) : end
    }, this[P_EXECUTOR], Block, true);
  }

  /**
   * Gets the list of all blocks.
   *
   * @returns {BaseAction}
   */
  getBlockCount() {
    return new BaseAction('getblockcount', {}, this[P_EXECUTOR], Number, false);
  }

  /**
   * Gets an operation in a block
   *
   * @param {Number} block
   * @param {Number} opblock
   *
   * @returns {BaseAction}
   */
  getBlockOperation({
    block,
    opblock
  }) {
    return new BaseAction('getblockoperation', {
      block: block !== null ? parseInt(block, 10) : block,
      opblock: opblock !== null ? parseInt(opblock, 10) : opblock
    }, this[P_EXECUTOR], Operation, false);
  }

  /**
   * Get all operations in a block
   *
   * @param {Number} block
   *
   * @returns {PagedAction}
   */
  getBlockOperations({
    block
  }) {
    return new PagedAction('getblockoperations', {
      block: block !== null ? parseInt(block, 10) : block
    }, this[P_EXECUTOR], Operation, true);
  }

  /**
   * Get all operations of an account
   *
   * @param {AccountNumber|Number|String} account
   * @param {Number|null} depth
   * @param {Number|null} startblock
   *
   * @returns {PagedAction}
   */
  getAccountOperations({
    account,
    depth = null,
    startblock = null
  }) {
    return new PagedAction('getaccountoperations', {
      account: new AccountNumber(account),
      depth: depth !== null ? parseInt(depth, 10) : depth,
      startblock: startblock !== null ? parseInt(startblock, 10) : startblock
    }, this[P_EXECUTOR], Operation, true);
  }

  /**
   * Gets all pending operations
   *
   * @returns {PagedAction}
   */
  getPendings() {
    return new PagedAction('getpendings', {}, this[P_EXECUTOR], Operation, true);
  }

  /**
   * Gets the number of pending operations
   *
   * @returns {BaseAction}
   */
  getPendingsCount() {
    return new BaseAction('getpendingscount', {}, this[P_EXECUTOR], Number, false);
  }

  /**
   * Decodes the given operation hash
   *
   * @param {OperationHash} ophash
   *
   * @returns {BaseAction}
   */
  decodeOpHash({
    ophash
  }) {
    return new BaseAction('decodeophash', {
      ophash
    }, this[P_EXECUTOR], OperationHash, false);
  }

  /**
   * Searches for an operation
   *
   * @param {OperationHash|null} ophash
   *
   * @returns {BaseAction}
   */
  findOperation({
    ophash = null
  }) {
    return new BaseAction('findoperation', {
      ophash
    }, this[P_EXECUTOR], Operation, false);
  }

  /**
   * Search for an operation signed by account and with n_operation, start searching block (0=all)
   *
   * @param {AccountNumber|Number|String} account
   * @param {Number} nOperation
   * @param {Number|null} block
   *
   * @returns {BaseAction}
   */
  findNOperation({
    account,
    nOperation,
    block = null
  }) {
    return new BaseAction('findnoperation', {
      account: new AccountNumber(account),
      n_operation: nOperation !== null ? parseInt(nOperation, 10) : nOperation,
      block: block !== null ? parseInt(block, 10) : block
    }, this[P_EXECUTOR], Operation, false);
  }

  /**
   * Search for operations signed by account within an n_operation range, start searching block (0=all)
   *
   * @param {AccountNumber|Number|String} account
   * @param {Number} nOperationMin
   * @param {Number} nOperationMax
   *
   * @returns {PagedAction}
   */
  findNOperations({
    account,
    nOperationMin,
    nOperationMax
  }) {
    return new PagedAction('findnoperations', {
      account: new AccountNumber(account),
      n_operation_min: nOperationMin !== null ? parseInt(nOperationMin, 10) : nOperationMin,
      n_operation_max: nOperationMax !== null ? parseInt(nOperationMax, 10) : nOperationMax
    }, this[P_EXECUTOR], Operation, true);
  }

  /**
   * Executes a transaction operation
   *
   * @param {AccountNumber|Number|String} sender
   * @param {AccountNumber|Number|String} target
   * @param {Currency} amount
   *
   * @returns {OperationAction}
   */
  sendTo({
    sender,
    target,
    amount
  }) {
    return new OperationAction('sendto', {
      sender: new AccountNumber(sender),
      target: new AccountNumber(target),
      amount: new Currency(amount)
    }, this[P_EXECUTOR], Operation, false);
  }

  /**
   * Executes a transaction operation
   *
   * @param {AccountNumber|Number|String} sender
   * @param {AccountNumber|Number|String} target
   * @param {String|BC|PublicKey|WalletPublicKey|PrivateKey|KeyPair} senderPubkey
   * @param {String|BC|PublicKey|WalletPublicKey|PrivateKey|KeyPair} targetPubkey
   * @param {Currency} amount
   *
   * @returns {SignOperationAction}
   */
  signSendTo({
    sender,
    target,
    senderPubkey,
    targetPubkey,
    amount
  }) {
    return new SignOperationAction('signsendto', {
      sender: new AccountNumber(sender),
      target: new AccountNumber(target),
      sender_pubkey: senderPubkey,
      target_pubkey: targetPubkey,
      amount: new Currency(amount)
    }, this[P_EXECUTOR], SignedOperation, false);
  }

  /**
   * Changes the key of an account
   *
   * @param {AccountNumber|Number|String} account
   * @param {String|BC|PublicKey|WalletPublicKey|PrivateKey|KeyPair} newPubkey
   * @param {AccountNumber|Number|String|null} accountSigner
   *
   * @returns {OperationAction}
   */
  changeKey({
    account,
    newPubkey,
    accountSigner = null
  }) {
    return new OperationAction('changekey', {
      account: new AccountNumber(account),
      new_pubkey: newPubkey,
      account_signer: accountSigner !== null ? new AccountNumber(accountSigner) : accountSigner
    }, this[P_EXECUTOR], Operation, false);
  }

  /**
   * Changes the key of multiple accounts
   *
   * @param {AccountNumber[]|Number[]|String[]} accounts
   * @param {String|BC|PublicKey|WalletPublicKey|PrivateKey|KeyPair} newPubkey
   *
   * @returns {OperationAction}
   */
  changeKeys({
    accounts,
    newPubkey
  }) {
    return new OperationAction('changekeys', {
      accounts: accounts.map((acc) => new AccountNumber(acc)),
      new_pubkey: newPubkey
    }, this[P_EXECUTOR], Operation, false);
  }

  /**
   * Signs a change key operation
   *
   * @param {AccountNumber|Number|String} account
   * @param {String|BC|PublicKey|WalletPublicKey|PrivateKey|KeyPair} oldPubkey
   * @param {String|BC|PublicKey|WalletPublicKey|PrivateKey|KeyPair} newPubkey
   * @param {AccountNumber|Number|String|null} accountSigner
   *
   * @returns {SignOperationAction}
   */
  signChangeKey({
    account,
    oldPubkey,
    newPubkey,
    accountSigner = null
  }) {
    return new SignOperationAction('signchangekey', {
      account: new AccountNumber(account),
      old_pubkey: oldPubkey,
      new_pubkey: newPubkey,
      account_signer: accountSigner !== null ? new AccountNumber(accountSigner) : accountSigner
    }, this[P_EXECUTOR], Object, false);
  }

  /**
   * Lists an account for sale
   *
   * @param {AccountNumber|Number|String} accountSigner
   * @param {AccountNumber|Number|String} accountTarget
   * @param {AccountNumber|Number|String} sellerAccount
   * @param {Number} lockedUntilBlock
   * @param {Currency} price
   * @param {String|BC|PublicKey|WalletPublicKey|PrivateKey|KeyPair|null} newPubkey
   *
   * @returns {OperationAction}
   */
  listAccountForSale({
    accountSigner,
    accountTarget,
    sellerAccount,
    lockedUntilBlock = 0,
    price,
    type,
    newPubkey = null,
    hashLock = null
  }) {
    return new OperationAction('listaccountforsale', {
      account_signer: new AccountNumber(accountSigner),
      account_target: new AccountNumber(accountTarget),
      seller_account: new AccountNumber(sellerAccount),
      locked_until_block: lockedUntilBlock !== null ? parseInt(lockedUntilBlock, 10) : lockedUntilBlock,
      price: new Currency(price),
      type,
      new_pubkey: newPubkey,
      enc_hash_lock: hashLock !== null ? hashLock : BC.fromHex('00'.repeat(32))
    }, this[P_EXECUTOR], Operation, false);
  }

  /**
   * Signs a list operation
   *
   * @param {String|BC|PublicKey|WalletPublicKey|PrivateKey|KeyPair} signerPubkey
   * @param {AccountNumber|Number|String} accountSigner
   * @param {AccountNumber|Number|String} accountTarget
   * @param {AccountNumber|Number|String} sellerAccount
   * @param {Number} lockedUntilBlock
   * @param {Currency} price
   * @param {String|BC|PublicKey|WalletPublicKey|PrivateKey|KeyPair|null} newPubkey
   *
   * @returns {SignOperationAction}
   */
  signListAccountForSale({
    signerPubkey,
    accountSigner,
    accountTarget,
    sellerAccount,
    lockedUntilBlock = 0,
    price,
    type,
    newPubkey = null,
    hashLock = null
  }) {
    return new SignOperationAction('signlistaccountforsale', {
      signer_pubkey: signerPubkey,
      account_signer: new AccountNumber(accountSigner),
      account_target: new AccountNumber(accountTarget),
      seller_account: new AccountNumber(sellerAccount),
      locked_until_block: lockedUntilBlock !== null ? parseInt(lockedUntilBlock, 10) : lockedUntilBlock,
      price: new Currency(price),
      type,
      new_pubkey: newPubkey,
      enc_hash_lock: hashLock
    }, this[P_EXECUTOR], Object, false);
  }

  /**
   * Delists an account
   *
   * @param {AccountNumber|Number|String} accountSigner
   * @param {AccountNumber|Number|String} accountTarget
   *
   * @returns {OperationAction}
   */
  DelistAccountForSale({
    accountSigner,
    accountTarget
  }) {
    return new OperationAction('delistaccountforsale', {
      account_signer: new AccountNumber(accountSigner),
      account_target: new AccountNumber(accountTarget)
    }, this[P_EXECUTOR], Operation, false);
  }

  /**
   * Signs a delist operation
   *
   * @param {String|BC|PublicKey|WalletPublicKey|PrivateKey|KeyPair} signerPubkey
   * @param {AccountNumber|Number|String} accountSigner
   * @param {AccountNumber|Number|String} accountTarget
   *
   * @returns {SignOperationAction}
   */
  signDelistAccountForSale({
    signerPubkey,
    accountSigner,
    accountTarget
  }) {
    return new SignOperationAction('signdelistaccountforsale', {
      signer_pubkey: signerPubkey,
      account_signer: new AccountNumber(accountSigner),
      account_target: new AccountNumber(accountTarget)
    }, this[P_EXECUTOR], Object, false);
  }

  /**
   * Buys an account
   *
   * @param {AccountNumber|Number|String} buyerAccount
   * @param {AccountNumber|Number|String} accountToPurchase
   * @param {Currency|null} price
   * @param {AccountNumber|Number|String|null} sellerAccount
   *
   * @returns {OperationAction}
   */
  buyAccount({
    buyerAccount,
    accountToPurchase,
    price = null,
    sellerAccount = null
  }) {
    return new OperationAction('buyaccount', {
      buyer_account: new AccountNumber(buyerAccount),
      account_to_purchase: new AccountNumber(accountToPurchase),
      price: price !== null ? new Currency(price) : price,
      seller_account: sellerAccount !== null ? new AccountNumber(sellerAccount) : sellerAccount
    }, this[P_EXECUTOR], Operation, false);
  }

  /**
   * Signs a buy account operation
   *
   * @param {String|BC|PublicKey|WalletPublicKey|PrivateKey|KeyPair} signerPubkey
   * @param {AccountNumber|Number|String} buyerAccount
   * @param {AccountNumber|Number|String} accountToPurchase
   * @param {Currency} price
   * @param {AccountNumber|Number|String} sellerAccount
   *
   * @returns {SignOperationAction}
   */
  signBuyAccount({
    signerPubkey,
    buyerAccount,
    accountToPurchase,
    price,
    sellerAccount
  }) {
    return new SignOperationAction('signbuyaccount', {
      signer_pubkey: signerPubkey,
      buyer_account: new AccountNumber(buyerAccount),
      account_to_purchase: new AccountNumber(accountToPurchase),
      price: new Currency(price),
      seller_account: new AccountNumber(sellerAccount)
    }, this[P_EXECUTOR], SignedOperation, false);
  }

  /**
   * Changes account infos
   *
   * @param {AccountNumber|Number|String} accountSigner
   * @param {AccountNumber|Number|String} accountTarget
   * @param {String|BC|PublicKey|WalletPublicKey|PrivateKey|KeyPair|null} newPubkey
   * @param {AccountName|String|null} newName
   * @param {Number|null} newType
   * @param {BC} newData
   *
   * @returns {OperationAction}
   */
  changeAccountInfo({
    accountSigner,
    accountTarget,
    newPubkey = null,
    newName = null,
    newType = null,
    newData = null,
  }) {
    return new OperationAction('changeaccountinfo', {
      account_signer: new AccountNumber(accountSigner),
      account_target: new AccountNumber(accountTarget),
      new_pubkey: newPubkey,
      new_name: newName !== null ? new AccountName(newName) : newName,
      new_type: newType !== null ? parseInt(newType, 10) : newType,
      new_data: newData !== null ? BC.from(newData) : newData
    }, this[P_EXECUTOR], Operation, false);
  }

  /**
   * Signs a change account info operation
   *
   * @param {String|BC|PublicKey|WalletPublicKey|PrivateKey|KeyPair} signerPubkey
   * @param {AccountNumber|Number|String} accountSigner
   * @param {AccountNumber|Number|String} accountTarget
   * @param {String|BC|PublicKey|WalletPublicKey|PrivateKey|KeyPair|null} newPubkey
   * @param {AccountName|String|null} newName
   * @param {Number|null} newType
   * @param {BC|null} newType
   *
   * @returns {SignOperationAction}
   */
  signChangeAccountInfo({
    signerPubkey,
    accountSigner,
    accountTarget,
    newPubkey = null,
    newName = null,
    newType = null,
    newData = null,
  }) {
    return new SignOperationAction('signchangeaccountinfo', {
      signer_pubkey: signerPubkey,
      account_signer: new AccountNumber(accountSigner),
      account_target: new AccountNumber(accountTarget),
      new_pubkey: newPubkey,
      new_name: newName !== null ? new AccountName(newName) : newName,
      new_type: newType !== null ? parseInt(newType, 10) : newType,
      new_data: newData !== null ? BC.from(newData) : newData
    }, this[P_EXECUTOR], Object, false);
  }

  /**
   * Signs a message using the given public key
   *
   * @param {BC} digest
   * @param {String|BC|PublicKey|WalletPublicKey|PrivateKey|KeyPair} pubkey
   *
   * @returns {BaseAction}
   */
  signMessage({
    digest,
    pubkey
  }) {
    return new BaseAction('signmessage', {
      digest,
      pubkey
    }, this[P_EXECUTOR], SignedMessage, false);
  }

  /**
   * Verifies a signature
   *
   * @param {BC} signature
   * @param {BC} digest
   * @param {String|BC|PublicKey|WalletPublicKey|PrivateKey|KeyPair} pubkey
   *
   * @returns {BaseAction}
   */
  verifySign({
    signature,
    digest,
    pubkey
  }) {
    return new BaseAction('verifysign', {
      signature,
      digest,
      pubkey
    }, this[P_EXECUTOR], SignedMessage, false);
  }

  /**
   * Removes an operation from the given rawoperations.
   *
   * @param {BC} rawoperations
   * @param {Number} index
   *
   * @returns {BaseAction}
   */
  operationsDelete({
    rawoperations,
    index
  }) {
    return new BaseAction('operationsdelete', {
      rawoperations,
      index: index !== null ? parseInt(index, 10) : index
    }, this[P_EXECUTOR], BC, false);
  }

  /**
   * Gets the information about the given operation
   *
   * @param {BC} rawoperations
   *
   * @returns {BaseAction}
   */
  operationsInfo({
    rawoperations
  }) {
    return new BaseAction('operationsinfo', {
      rawoperations
    }, this[P_EXECUTOR], Operation, true);
  }

  /**
   * Executes the given operations
   *
   * @param {BC} rawoperations
   *
   * @returns {BaseAction}
   */
  executeOperations({
    rawoperations
  }) {
    return new BaseAction('executeoperations', {
      rawoperations
    }, this[P_EXECUTOR], Operation, true);
  }

  /**
   * Returns the current node status
   *
   * @returns {BaseAction}
   */
  nodeStatus() {
    return new BaseAction('nodestatus', {}, this[P_EXECUTOR], NodeStatus, false);
  }

  /**
   * Encodes a public key to a pascalcoin public key
   *
   * @param {BC} x
   * @param {BC} y
   * @param {Number} ecNid
   *
   * @returns {BaseAction}
   */
  encodePubKey({
    x,
    y,
    ecNid
  }) {
    return new BaseAction('encodepubkey', {
      x,
      y,
      ec_nid: ecNid !== null ? parseInt(ecNid, 10) : ecNid
    }, this[P_EXECUTOR], BC, false);
  }

  /**
   * Decodes an encoded public key.
   *
   * @param {BC} pubkey
   *
   * @returns {BaseAction}
   */
  decodePubKey({
    pubkey
  }) {
    return new BaseAction('decodepubkey', {
      pubkey
    }, this[P_EXECUTOR], Object, false);
  }

  /**
   * Encrypts a payload
   *
   * @param {BC} payload
   * @param {String} payloadMethod
   * @param {String|null} pwd
   * @param {String|BC|PublicKey|WalletPublicKey|PrivateKey|KeyPair|null} pubkey
   *
   * @returns {BaseAction}
   */
  payloadEncrypt({
    payload,
    payloadMethod,
    pwd = null,
    pubkey = null
  }) {
    return new BaseAction('payloadencrypt', {
      payload,
      payload_method: payloadMethod,
      pwd,
      pubkey
    }, this[P_EXECUTOR], BC, false);
  }

  /**
   * Decrypts a payload
   *
   * @param {BC} payload
   * @param {String[]} pwds
   *
   * @returns {BaseAction}
   */
  payloadDecrypt({
    payload,
    pwds
  }) {
    return new BaseAction('payloaddecrypt', {
      payload,
      pwds
    }, this[P_EXECUTOR], BC, false);
  }

  /**
   * Gets the connections of a node.
   *
   * @returns {BaseAction}
   */
  getConnections() {
    return new BaseAction('getconnections', {}, this[P_EXECUTOR], Connection, true);
  }

  /**
   * Generates a new key and adds it to the nodes wallet.
   *
   * @param {Number} ecNid
   * @param {String} name
   *
   * @returns {BaseAction}
   */
  addNewKey({
    ecNid,
    name
  }) {
    return new BaseAction('addnewkey', {
      ec_nid: ecNid !== null ? parseInt(ecNid, 10) : ecNid,
      name
    }, this[P_EXECUTOR], WalletPublicKey, false);
  }

  /**
   * Locks the wallet.
   *
   * @returns {BaseAction}
   */
  lock() {
    return new BaseAction('lock', {}, this[P_EXECUTOR], Boolean, false);
  }

  /**
   * Unlocks the wallet.
   *
   * @param {String} pwd
   *
   * @returns {BaseAction}
   */
  unlock({
    pwd
  }) {
    return new BaseAction('unlock', {
      pwd
    }, this[P_EXECUTOR], Boolean, false);
  }

  /**
   * Sets the wallet password.
   *
   * @param {String} pwd
   *
   * @returns {BaseAction}
   */
  setWalletPassword({
    pwd
  }) {
    return new BaseAction('setwalletpassword', {
      pwd
    }, this[P_EXECUTOR], Boolean, false);
  }

  /**
   * Stops the node.
   *
   * @returns {BaseAction}
   */
  stopNode() {
    return new BaseAction('stopnode', {}, this[P_EXECUTOR], Boolean, false);
  }

  /**
   * Starts the node.
   *
   * @returns {BaseAction}
   */
  startNode() {
    return new BaseAction('startnode', {}, this[P_EXECUTOR], Boolean, false);
  }

  /**
   * Cleans the BlackList.
   *
   * @returns {BaseAction}
   */
  cleanBlackList() {
    return new BaseAction('cleanblacklist', {}, this[P_EXECUTOR], Number, false);
  }

  /**
   * Gets IP stats
   *
   * @returns {BaseAction}
   */
  nodeIPStats() {
    return new BaseAction('node_ip_stats', {}, this[P_EXECUTOR], Object, true);
  }

  /**
   * Adds an operation to a multioperation
   *
   * @param {BC} rawoperations
   * @param {Boolean} autoNOperation
   * @param {Object[]|Sender[]} senders
   * @param {Object[]|Receiver[]} receivers
   * @param {Object[]|Changer[]} changesinfo
   *
   * @returns {BaseAction}
   */
  multiOperationAddOperation({
    rawoperations,
    autoNOperation,
    senders,
    receivers,
    changesinfo
  }) {
    return new BaseAction('multioperationaddoperation', {
      rawoperations,
      auto_n_operation: autoNOperation,
      senders: senders.map((sen) => new Sender(sen)),
      receivers: receivers.map((rec) => new Receiver(rec)),
      changesinfo: changesinfo.map((chng) => new Changer(chng))
    }, this[P_EXECUTOR], BC, true);
  }

  /**
   * Signs the given rawoperations
   *
   * @param {BC} rawoperations
   * @param {Object} accountsAndKeys
   *
   * @returns {BaseAction}
   */
  multiOperationSignOffline({
    rawoperations,
    accountsAndKeys
  }) {
    return new BaseAction('multioperationsignoffline', {
      rawoperations,
      accounts_and_keys: accountsAndKeys
    }, this[P_EXECUTOR], Operation, true);
  }

  /**
   * Signs the given rawoperations online
   *
   * @param {BC} rawoperations
   *
   * @returns {BaseAction}
   */
  multiOperationSignOnline({
    rawoperations
  }) {
    return new BaseAction('multioperationsignonline', {
      rawoperations
    }, this[P_EXECUTOR], Operation, true);
  }

}

module.exports = Client;
