/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const Endian = require('@pascalcoin-sbx/common').Endian;
const Coding = require('@pascalcoin-sbx/common').Coding;
const CompositeType = Coding.CompositeType;
const SenderRawCoder = require('./Sender/RawCoder');
const ReceiverCoder = require('./Receiver/RawAndDigestCoder');
const ChangerRawCoder = require('./Changer/RawCoder');
const MultiOperation = require('./Operation');
const Sender = require('./Sender/Sender');
const Receiver = require('./Receiver/Receiver');
const Changer = require('./Changer/Changer');

/**
 * The raw coder for a ChangeKey operation.
 */
class RawCoder extends CompositeType {
  /**
   * Constructor
   */
  constructor() {
    super('change_key_op_raw');
    this.description('The coder for the raw representation of a MultiOperation');
    this.addSubType(
      new Coding.Core.Int16('protocol', true, Endian.LITTLE_ENDIAN)
        .description('The protocol version (3).')
        .withFixedValue(3)
    );
    this.addSubType(
      new Coding.Core.Int16('sendersCount', true, Endian.LITTLE_ENDIAN)
        .description('The number of senders')
    );
    this.addSubType(
      new Coding.Repeating('senders', new SenderRawCoder(), -1, 'sendersCount')
        .description('Senders of the multi-operation')
    );

    this.addSubType(
      new Coding.Core.Int16('receiversCount', true, Endian.LITTLE_ENDIAN)
        .description('The number of receivers')
    );
    this.addSubType(
      new Coding.Repeating('receivers', new ReceiverCoder(), -1, 'receiversCount')
        .description('Receivers of the multi-operation')
    );
    this.addSubType(
      new Coding.Core.Int16('changersCount', true, Endian.LITTLE_ENDIAN)
        .description('The number of changers')
    );
    this.addSubType(
      new Coding.Repeating('changers', new ChangerRawCoder(), -1, 'changersCount')
        .description('Changers of the multi-operation')
    );
  }

  /**
   * @inheritDoc AbstractType#typeInfo
   */
  /* istanbul ignore next */
  get typeInfo() {
    let info = super.typeInfo;

    info.name = 'Change Key Operation (RAW)';
    info.hierarchy.push(info.name);
    return info;
  }

  /**
   * Decodes the encoded ChangeKey operation.
   *
   * @param {BC|Buffer|Uint8Array|String} bc
   * @param {Object} options
   * @param {*} all
   * @return {ChangeKey}
   */
  decodeFromBytes(bc, options = {}, all = null) {
    const decoded = super.decodeFromBytes(bc);
    const op = new MultiOperation();

    decoded.senders.forEach((sender) => {
      let senderObj = new Sender(sender.account, sender.amount);

      senderObj.withNOperation(sender.nOperation);
      senderObj.withPayload(sender.payload);
      senderObj.withSign(sender.r, sender.s);
      op.addSender(senderObj);
    });

    decoded.receivers.forEach((receiver) => {
      let receiverObj = new Receiver(receiver.account, receiver.amount);

      receiverObj.withPayload(receiver.payload);

      op.addReceiver(receiverObj);
    });

    decoded.changers.forEach((changer) => {
      let changerObj = new Changer(changer.account);

      changerObj.withNOperation(changer.nOperation);
      if ((changer.changeType & 1) === 1) {
        changerObj.withNewPublicKey(changer.newPublicKey);
      }
      if ((changer.changeType & 2) === 2) {
        changerObj.withNewName(changer.newName);
      }
      if ((changer.changeType & 4) === 4) {
        changerObj.withNewType(changer.newType);
      }
      changerObj.withSign(changer.r, changer.s);
      op.addChanger(changerObj);
    });

    return op;
  }

}

module.exports = RawCoder;
