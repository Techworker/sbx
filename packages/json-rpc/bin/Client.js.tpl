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
const Account = require('./Types/Account');
const Block = require('./Types/Block');
const SignedMessage = require('./Types/SignedMessage');
const NodeStatus = require('./Types/NodeStatus');
const Operation = require('./Types/Operation');
const Sender = require('./Types/Sender');
const Receiver = require('./Types/Receiver');
const Changer = require('./Types/Changer');
const Connection = require('./Types/Connection');
const WalletPublicKey = require('./Types/WalletPublicKey');
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

  __CONTENT__
}

module.exports = Client;
