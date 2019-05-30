const BlockRepository = require('./../Repositories/Block');

module.exports = function (rpc) {
  let blockRepo = new BlockRepository(rpc);

  return {
    changers(parent, args, context, info) {
      return parent.changers;
    },
    receivers(parent, args, context, info) {
      return parent.receivers;
    },
    senders(parent, args, context, info) {
      return parent.senders;
    },
    block(parent, args, context, info) {
      return parent.block;
    },
    fetchBlock(parent, args, context, info) {
      return blockRepo.getBlock(parent.block);
    }
  };
};
