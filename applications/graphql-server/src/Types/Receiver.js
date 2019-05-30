const AccountRepository = require('./../Repositories/Account');

module.exports = function (rpc) {
  let accountRepo = new AccountRepository(rpc);

  return {
    fetchAccount(parent, args, context, info) {
      return accountRepo.getAccount(parent.account);
    }
  };
};
