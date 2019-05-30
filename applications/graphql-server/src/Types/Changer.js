const AccountRepository = require('./../Repositories/Account');
const BlockRepository = require('./../Repositories/Block');

module.exports = function (rpc) {
  let accountRepo = new AccountRepository(rpc);
  let blockRepo = new BlockRepository(rpc);

  return {
    fetchAccount(parent, args, context, info) {
      return accountRepo.getAccount(parent.account);
    },
    fetchSellerAccount(parent, args, context, info) {
      if (parent.sellerAccount !== null) {
        return accountRepo.getAccount(parent.sellerAccount);
      }
      return null;
    },
    fetchLockedUntilBlock(parent, args, context, info) {
      return blockRepo.getBlock(parent.lockedUntilBlock);
    }
  };
};
