const fs = require('fs');
const sbxGraphql = require('@pascalcoin-sbx/graphql');
const sbxRpc = require('@pascalcoin-sbx/json-rpc');
const apollo = require('apollo-server');
const pubsub = new apollo.PubSub();

const AccountType = require('./src/Types/Account');
const OperationType = require('./src/Types/Operation');
const BlockType = require('./src/Types/Block');
const ChangerType = require('./src/Types/Changer');
const ReceiverType = require('./src/Types/Receiver');
const SenderType = require('./src/Types/Sender');
const QueryType = require('./src/Types/Query');

const rpc = sbxRpc.Client.factory('http://127.0.0.1:4103');

const PENDING_ADDED = 'PENDING_ADDED';

// GraphQL schema
var typeDefs = apollo.gql(fs.readFileSync('./schema.graphql').toString());

const apolloResolvers = {
  // SCALAR TYPES
  AccountNumber: sbxGraphql.Types.Scalar.AccountNumber,
  AccountName: sbxGraphql.Types.Scalar.AccountName,
  Currency: sbxGraphql.Types.Scalar.Currency,
  HexaString: sbxGraphql.Types.Scalar.HexaString,
  OperationHash: sbxGraphql.Types.Scalar.OperationHash,
  PublicKey: sbxGraphql.Types.Scalar.PublicKey,

  // QUERIES
  Query: QueryType(rpc),
  // ENTITIES
  Account: AccountType(rpc),
  Block: BlockType(rpc),
  Operation: OperationType(rpc),
  Changer: ChangerType(rpc),
  Receiver: ReceiverType(rpc),
  Sender: SenderType(rpc),
  Mutation: {
    addPending(parent, args, context) {
      pubsub.publish(PENDING_ADDED, { pendingAdded: args.opHash});
      return args.opHash;
    }
  },
  Subscription: {
    pendingAdded: {
      subscribe: () => pubsub.asyncIterator([PENDING_ADDED])
    }
  }
};

const server = new apollo.ApolloServer({ typeDefs, resolvers: apolloResolvers });

// This `listen` method launches a web-server.  Existing apps
// can utilize middleware options, which we'll discuss later.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
