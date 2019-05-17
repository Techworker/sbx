/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const Abstract = require('./../../Abstract');

const P_CHANGERS = Symbol('changers');
const P_SENDERS = Symbol('senders');
const P_RECEIVERS = Symbol('receivers');

/**
 * Representation of a signable MultiOperation.
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
    this[P_SENDERS] = [];
    this[P_RECEIVERS] = [];
    this[P_CHANGERS] = [];
  }

  /**
   * Adds a single sender.
   *
   * @param {Sender} sender
   */
  addSender(sender) {
    this[P_SENDERS].push(sender);
  }

  /**
   * Adds a receiver.
   *
   * @param {Receiver} receiver
   */
  addReceiver(receiver) {
    this[P_RECEIVERS].push(receiver);
  }

  /**
   * Adds a Changer.
   *
   * @param {Changer} changer
   */
  addChanger(changer) {
    this[P_CHANGERS].push(changer);
  }

  /**
   * Gets the list of all senders.
   *
   * @return {Sender[]}
   */
  get senders() {
    return Object.values(this[P_SENDERS]);
  }

  /**
   * Gets the number of all senders.
   *
   * @return {number}
   */
  get sendersCount() {
    return this.senders.length;
  }

  /**
   * Gets the list of all receivers.
   *
   * @return {Receiver[]}
   */
  get receivers() {
    return this[P_RECEIVERS];
  }

  /**
   * Gets the number of receivers.
   *
   * @return {Number}
   */
  get receiversCount() {
    return this[P_RECEIVERS].length;
  }

  /**
   * Gets the list of changers.
   *
   * @return {Changer[]}
   */
  get changers() {
    return this[P_CHANGERS];
  }

  /**
   * Gets the number of changers.
   *
   * @return {number}
   */
  get changersCount() {
    return this.changers.length;
  }
}

module.exports = MultiOperation;
