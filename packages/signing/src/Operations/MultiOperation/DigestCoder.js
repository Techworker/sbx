/**
 * Copyright (c) Benjamin Ansbach - all rights reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const Endian = require('@pascalcoin-sbx/common').Endian;
const Coding = require('@pascalcoin-sbx/common').Coding;
const CompositeType = Coding.CompositeType;
const MultiOperation = require('./Operation');
const Sender = require('./Sender/Sender');
const Receiver = require('./Receiver/Receiver');
const Changer = require('./Changer/Changer');
const SenderDigestCoder = require('./Sender/DigestCoder');
const ChangerDigestCoder = require('./Changer/DigestCoder');
const ReceiverCoder = require('./Receiver/RawAndDigestCoder');

/**
 * The digest coder for a Multi operation.
 */
class DigestCoder extends CompositeType {
  /**
   * Constructor
   */
  constructor() {
    super('multi_op_digest');
    this.description('The coder for the digest representation of a MultiOperation');
    this.addSubType(
      new Coding.Core.Int16('protocol')
        .description('The protocol version (3).')
        .withFixedValue(3)
    );
    this.addSubType(
      new Coding.Core.Int16('sendersCount', true, Endian.LITTLE_ENDIAN)
        .description('The number of senders')
    );
    this.addSubType(
      new Coding.Repeating('senders', new SenderDigestCoder())
        .description('Senders of the multi-operation')
    );
    this.addSubType(
      new Coding.Core.Int16('receiversCount', true, Endian.LITTLE_ENDIAN)
        .description('The number of receivers')
    );
    this.addSubType(
      new Coding.Repeating('receivers', new ReceiverCoder())
        .description('Receivers of the multi-operation')
    );
    this.addSubType(
      new Coding.Core.Int16('changersCount', true, Endian.LITTLE_ENDIAN)
        .description('The number of changers')
    );
    this.addSubType(
      new Coding.Repeating('changers', new ChangerDigestCoder())
        .description('Changers of the multi-operation')
    );
    this.addSubType(
      new Coding.Pascal.OpType('optype', 1)
        .withFixedValue(9)
        .description('The optype as 8bit int.')
    );
  }

  /**
   * @inheritDoc AbstractType#typeInfo
   */
  /* istanbul ignore next */
  get typeInfo() {
    let info = super.typeInfo;

    info.name = 'MultiOperation (DIGEST)';
    info.hierarchy.push(info.name);
    return info;
  }

  /**
   * Decodes the encoded MultiOperation operation.
   *
   * @param {BC|Buffer|Uint8Array|String} bc
   * @param {Object} options
   * @param {*} all
   * @return {MultiOperation}
   */
  decodeFromBytes(bc, options = {}, all = null) {
    const decoded = super.decodeFromBytes(bc);
    const op = new MultiOperation();

    decoded.senders.forEach((sender) => {
      let senderObj = new Sender(sender.account, sender.amount);

      senderObj.withNOperation(sender.nOperation);
      senderObj.withPayload(sender.payload);
      op.addSender(senderObj);
    });

    decoded.receivers.forEach((receiver) => {
      let receiverObj = new Receiver(receiver.account, receiver.payload);

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
      op.addChanger(changerObj);
    });

    return op;
  }
}

module.exports = DigestCoder;
