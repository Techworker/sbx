const sbxGraphql = require('@sbx/graphql');
const sbxRpc = require('@sbx/json-rpc');
const apollo = require('apollo-server');

const rpc = sbxRpc.Client.factory('http://127.0.0.1:4003');

const sbxResolvers = {
  account: new sbxGraphql.Resolver.AccountResolver(rpc),
  operation: new sbxGraphql.Resolver.OperationResolver(rpc),
  block: new sbxGraphql.Resolver.BlockResolver(rpc)
};

// GraphQL schema
var typeDefs = apollo.gql(sbxGraphql.Schema);

const apolloResolvers = {
  // SCALAR TYPES
  AccountNumber: sbxGraphql.Types.Scalar.AccountNumber,
  AccountName: sbxGraphql.Types.Scalar.AccountName,
  Currency: sbxGraphql.Types.Scalar.Currency,
  HexaString: sbxGraphql.Types.Scalar.HexaString,
  OperationHash: sbxGraphql.Types.Scalar.OperationHash,
  PublicKey: sbxGraphql.Types.Scalar.PublicKey,

  // QUERIES
  Query: {
    fetchAccount(parent, args, context, info) {
      return sbxResolvers.account.getAccount(args.account);
    },
    fetchOperation(parent, args, context, info) {
      return sbxResolvers.operation.getOperation(args.opHash);
    },
    fetchBlock(parent, args, context, info) {
      return sbxResolvers.block.getBlock(args.block);
    }
  },
  // ENTITIES
  Account: {
    fetchOperations(parent, args, context, info) {
      return sbxResolvers.account.getOperations(parent.account, args.page, args.amount, args.opType, args.subType);
    },
    lockedUntilBlock(parent, args, context, info) {
      return parent.lockedUntilBlock;
    },
    fetchLockedUntilBlock(parent, args, context, info) {
      return sbxResolvers.block.getBlock(parent.lockedUntilBlock);
    }
  },
  // ENTITIES
  Block: {
    fetchOperations(parent, args, context, info) {
      return sbxResolvers.block.getOperations(parent.account, args.page, args.amount, args.opType, args.subType);
    }
  },
  Operation: {
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
      return sbxResolvers.block.getBlock(parent.block);
    },
    payloadAsString(parent, args, context, info) {
      return parent.payload.toString();
    }
  },
  Changer: {
    fetchAccount(parent, args, context, info) {
      return sbxResolvers.account.getAccount(parent.account);
    },
    account(parent, args, context, info) {
      return parent.account;
    },
    fetchSellerAccount(parent, args, context, info) {
      if (parent.sellerAccount !== null) {
        return sbxResolvers.account.getAccount(parent.sellerAccount);
      }
      return null;
    },
    sellerAccount(parent, args, context, info) {
      return parent.account;
    },
    fetchLockedUntilBlock(parent, args, context, info) {
      return sbxResolvers.block.getBlock(parent.lockedUntilBlock);
    },
    lockedUntilBlock(parent, args, context, info) {
      return parent.lockedUntilBlock;
    }
  },
  Receiver: {
    fetchAccount(parent, args, context, info) {
      return sbxResolvers.account.getAccount(parent.account);
    },
    account(parent, args, context, info) {
      return parent.account;
    },
    payloadAsString(parent, args, context, info) {
      return parent.payload.toString();
    }
  },
  Sender: {
    fetchAccount(parent, args, context, info) {
      return sbxResolvers.account.getAccount(parent.account);
    },
    account(parent, args, context, info) {
      return parent.account;
    },
    payloadAsString(parent, args, context, info) {
      return parent.payload.toString();
    }
  }
};

const server = new apollo.ApolloServer({ typeDefs, resolvers: apolloResolvers });

// This `listen` method launches a web-server.  Existing apps
// can utilize middleware options, which we'll discuss later.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
