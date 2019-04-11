module.exports = {
  Schema: `scalar AccountNumber
scalar AccountName

type Query {
    getAccount(account: AccountNumber!): Account
    getOperation(ophash: String!): Operation
}

enum OpType {
    ALL
    BLOCKCHAIN_REWARD
    TRANSACTION
    CHANGE_KEY
    RECOVER_FUNDS
    LIST_FOR_SALE
    DELIST
    BUY
    CHANGE_KEY_ACCOUNT
    CHANGE_ACCOUNT_INFO
    MULTI_OPERATION
    DATA
}

type Account {
    account: AccountNumber!
    name: String
    type: Int!
    balance: Float!
    n_operation: Int!
    updated_b: Int!
    state: String!
    locked_until_block: Int!
    price: Float
    seller_account: Account
    private_sale: Boolean
    new_enc_pubkey: String
    lastOperations(amount: Int, opType: OpType = IGNORE) : [Operation]
}

type Operation {
    valid: Boolean!
    errors: String
    block: Int
    time: Int
    opblock: Int
    payload: String
    maturation: Int
    optype: Int!
    account: Account
    optxt: String
    ophash: String
    subtype: Int
    signer_account: Account
    changers: [Changer],
    receivers: [Receiver],
    senders: [Sender]
}

type Changer {
    account: Account
    n_operation: Int
    new_enc_pubkey: String
    new_name: String
    new_type: Int
    seller_account: Account
    account_price: Float
    locked_until_block: Int
    fee: Float
}

type Receiver {
    account: Account
    amount: Float
    payload: String
}

type Sender {
    account: Account
    n_operation: Int
    amount: Float
    payload: String
}`,
  Resolver: require('./src/Resolver'),
  Types: require('./src/Types')
};
