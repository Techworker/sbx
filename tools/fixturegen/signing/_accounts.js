const Crypto = require('@pascalcoin-sbx/crypto');
const Common = require('@pascalcoin-sbx/common');

module.exports = {
  accounts: {
    Account1: {
      account: 91445,
      publicKey: Common.decodePublicKeyBase58(
        '3Ghhbor4qWpdy8enigo313tRsutjhwdotVzMNCkpe9d3vLdRVzKzgVjgdEFDga5AwAWdHFH2GfWheCzYLP8aGKRPXjbYKv2dfzy5Xz'
      ),
      keyPair: Crypto.keyPairFromEncryptedPrivateKey(
        '53616C7465645F5F1F696A34A80656DBE0B0610A12C60CCB69EA70C77F40493E3D78815E16908A9F536611380A9A5E0AE68B78121D91593F254304E5FBE7DE83',
        'test123'
      )
    },
    Account2: {
      account: 91446,
      publicKey: Common.decodePublicKeyBase58(
        'gD8AW5cpqydcx9JdaoLv4ywW4DMRnhnRsDeXaki2W8Y2TotNEBuGRUUrgyz57Z4SXx2UVjj2zZxzYB7JAdCFrWghNBRKHREW6Q4n8ndiu2YFJZAAehZWPEbLK3hokevfVid3GZZbXVQhUELMc'
      ),
      keyPair: Crypto.keyPairFromEncryptedPrivateKey(
        '53616C7465645F5FC6FE6F1F1980F6795E1C3F1B35065289F34D2EB2B81B22E45CB5AB8287C0B4796F600BAF7201F19516CDE75D14BB982562829A8D2CEBE1F886613D1BC65C26F3F506BCFDDA0F7C7E',
        'test123'
      )
    },
    Account3: {
      id: 'Account3',
      account: 91447,
      publicKey: Common.decodePublicKeyBase58(
        'JJj2GZDcuhz1nfuLkExwdC8T6VsDvakYW9CWj9oqBytDt4t8GiNkCLqiARWJqE7r82cWkJehCL4cugp94kf85mkvVJVABHAQpiCkn7LfM2L1WRVpat6F7vwvr48sJiJmxtHXmH7f9LEDnyu8H3CZmywTSbQSEZVCQfxiU6BCiRa78ZN2AoETJM2VB3sLubP1d'
      ),
      keyPair: Crypto.keyPairFromEncryptedPrivateKey(
        '53616C7465645F5FC158C492989C9F41B4D3BA302CD43D0B3C5ECC3797E1FE6E3DAC316CC2BB8C71E08846ADCD108728179BD453834512543FD6F2371F9E6D5F27117890DE782C99983D27EADE63DB536630C0EBD352FD7DF533802F3258CE1A',
        'test123'
      )
    }
  }
};
