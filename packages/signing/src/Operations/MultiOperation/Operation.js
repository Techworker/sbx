/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const Abstract = require('./../../Abstract');
const Receiver = require('./Receiver/Receiver');
const Sender = require('./Sender/Sender');

const P_OPERATIONS = Symbol('operations');
const P_CHANGERS = Symbol('changers');
const P_SENDERS = Symbol('senders');
const P_RECEIVERS = Symbol('receivers');
const P_RECEIVERS_UQ = Symbol('receivers_uq');
const P_KEYPAIRS = Symbol('keypairs');

/**
 * Representation of a signable ChangeKey operation.
 */
class MultiOperation extends Abstract {
  /**
   * Gets the optype.
   *
   * @returns {number}
   */
  get opType() {
    return 9;
  }

  /**
   * Constructor.
   */
  constructor() {
    super();
    this[P_OPERATIONS] = [];
    this[P_SENDERS] = {};
    this[P_RECEIVERS] = [];
    this[P_CHANGERS] = {};
    this[P_RECEIVERS_UQ] = {};
    this[P_KEYPAIRS] = {};
  }

  addTransaction(keyPair, operation, receiverPayload = null) {
    // transaction operation, first create a single sender
    if (this[P_SENDERS][operation.sender] === undefined) {
      let sender = new Sender(
        operation.sender,
        operation.amount
      );

      sender.withNOperation(operation.nOperation);
      sender.withPayload(operation.payload);
      this[P_SENDERS][operation.sender] = sender;
    } else {
      this[P_SENDERS][operation.sender].addAmount(operation.amount);
    }
    this[P_KEYPAIRS][operation.sender] = keyPair;

    let receiver = new Receiver(
      operation.target,
      operation.amount
    );

    receiver.withPayload(receiverPayload || operation.payload);
    const uq = receiver.payload.toHex() + receiver.amount.toStringOpt();

    if (this[P_RECEIVERS_UQ][uq] !== undefined) {
      throw new Error('Receivers must have unique amount and payload.');
    }
    this[P_RECEIVERS_UQ][uq] = uq;
    this[P_RECEIVERS].push(receiver);
  }

  get senders() {
    return Object.values(this[P_SENDERS]);
  }
  get sendersCount() {
    return this.senders.length;
  }

  get receivers() {
    return this[P_RECEIVERS];
  }
  get receiversCount() {
    return this[P_RECEIVERS].length;
  }

  get changers() {
    return Object.values(this[P_CHANGERS]);
  }
  get changersCount() {
    return this.changers.length;
  }
}

module.exports = MultiOperation;
