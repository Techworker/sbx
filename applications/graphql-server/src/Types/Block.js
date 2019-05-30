const BlockRepository = require('./../Repositories/Block');
const Enum = require('./../Enum');

module.exports = function (rpc) {
  let blockRepo = new BlockRepository(rpc);

  return {
    fetchOperations(parent, args, context, info) {
      return blockRepo.getOperations(
        parent.account,
        args.page,
        args.amount,
        Enum.OPTYPE(args.opType),
        Enum(args.subType)
      );
    }
  };
};
