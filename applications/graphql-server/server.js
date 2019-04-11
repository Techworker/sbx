const sbxGraphql = require('@sbx/graphql');
const sbxRpc = require('@sbx/json-rpc');
const apollo = require('apollo-server');

const rpc = sbxRpc.Client.factory('http://127.0.0.1:4103');

const sbxResolvers = {
  account: new sbxGraphql.Resolver.AccountResolver(rpc)
};

// GraphQL schema
var typeDefs = apollo.gql(sbxGraphql.Schema);

const apolloResolvers = {
  // SCALAR TYPES
  AccountNumber: sbxGraphql.Types.Scalar.AccountNumber,
  AccountName: sbxGraphql.Types.Scalar.AccountName,

  // QUERIES
  Query: {
    getAccount(parent, args, context, info) {
      return sbxResolvers.account.getAccount(args.account);
    }
  },
  // ENTITIES
  Account: {
    lastOperations(parent, args, context, info) {
      return sbxResolvers.account.lastOperations(parent.account, args.opType, args.amount);
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
    }
  },
  Changer: {
    account(parent, args, context, info) {
      return sbxResolvers.account.getAccount(parent.account);
    },
    seller_account(parent, args, context, info) {
      if (parent.seller_account !== null) {
        return sbxResolvers.account.getAccount(parent.seller_account);
      }
      return null;
    }
  },
  Receiver: {
    account(parent, args, context, info) {
      return sbxResolvers.account.getAccount(parent.account);
    }
  },
  Sender: {
    account(parent, args, context, info) {
      return sbxResolvers.account.getAccount(parent.account);
    }
  }
};

// In the most basic sense, the ApolloServer can be started
// by passing type definitions (typeDefs) and the resolvers
// responsible for fetching the data for those types.
const server = new apollo.ApolloServer({ typeDefs, resolvers: apolloResolvers });

// This `listen` method launches a web-server.  Existing apps
// can utilize middleware options, which we'll discuss later.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
