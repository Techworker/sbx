const AccountRepository = require('./../Repositories/Account');
const BlockRepository = require('./../Repositories/Block');
const OperationRepository = require('./../Repositories/Operation');

module.exports = function (rpc) {
  let accountRepo = new AccountRepository(rpc);
  let blockRepo = new BlockRepository(rpc);
  let operationRepo = new OperationRepository(rpc);

  return {
    fetchAccount(parent, args, context, info) {
      return accountRepo.getAccount(args.account);
    },
    fetchOperation(parent, args, context, info) {
      return operationRepo.getOperation(args.opHash);
    },
    fetchBlock(parent, args, context, info) {
      return blockRepo.getBlock(args.block);
    }
  };
};
