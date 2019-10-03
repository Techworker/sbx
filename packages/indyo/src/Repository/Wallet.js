const AccountNameSearchType = require('@pascalcoin-sbx/json-rpc').Types.AccountNameSearchType;
const AccountStatusSearchType = require('@pascalcoin-sbx/json-rpc').Types.AccountStatusSearchType;
const Account = require('./../Objects/Account');

const P_IND = Symbol('indyo');
const P_RPC = Symbol('rpc');

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
   * Tries to find an account by its account number.
   *
   * @param {AccountNumber} accountNumber
   * @return {Promise<void>|Account}
   */
  async sendTo(receiver, amount, payload) {
    if (accountNumber === null) return null;

    return this[P_IND].executeAndTransform(
      this[P_RPC].getAccount({account: accountNumber}), Account
    );
  }

  async findByAccountNumbers() {
    let actions = [];
    for(let account = 1; account < 5; account++) {
      let action = rpcClient.getAccount({account});
      actions.push(action.execute());
    }
    Promise.all(actions).then(([...result]) => {
      result.forEach(([accountObj, transform]) => {
        console.log(accountObj);
        console.log(transform(accountObj));
      });
    });
  }

  async findByPublicKey(publicKey, amount = null, offset = null) {
    return this[P_IND].execute(
      this[P_RPC].findAccounts({pubkey: publicKey}), Account, amount, offset
    );
  }

  /**
   * Tries to retrieve an account by its name.
   *
   * @param {String} name
   * @param {String} searchType
   * @param {Number|null} offset
   * @param {Number|null} amount
   * @return {Promise}
   */
  async findByName(name, searchType = AccountNameSearchType.EXACT, amount = null, offset = null) {
    const action = this[P_RPC].findAccounts({
      name: name,
      namesearchtype: searchType
    });

    return await this[P_IND].execute(action, Account, amount, offset);
  }

  /**
   * Tries to retrieve an account by its status.
   *
   * @param {String} status
   * @param {Number|null} offset
   * @param {Number|null} amount
   * @return {Promise}
   */
  async findByStatus(status = AccountStatusSearchType.ALL, amount = null, offset = null) {
    const action = this[P_RPC].findAccounts({
      statustype: status
    });

    return await this[P_IND].execute(action, Account, amount, offset);
  }
}

module.exports = Accounts;
