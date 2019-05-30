const Enum = require('./../Enum');
const AccountRepository = require('./../Repositories/Account');
const BlockRepository = require('./../Repositories/Block');

module.exports = function (rpc) {
  let accountRepo = new AccountRepository(rpc);
  let blockRepo = new BlockRepository(rpc);

  return {
    fetchOperations(parent, args, context, info) {
      return accountRepo.getOperations(
        parent.account,
        args.page,
        args.amount,
        Enum.OPTYPE(args.opType),
        Enum.SUBTYPE(args.subType)
      );
    },
    fetchLockedUntilBlock(parent, args, context, info) {
      return blockRepo.getBlock(parent.lockedUntilBlock);
    }
  };
};
