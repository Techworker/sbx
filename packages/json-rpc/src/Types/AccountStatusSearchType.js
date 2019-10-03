class AccountStatusSearchType
{
  static get ALL() {
    return 'all';
  }
  static get FOR_SALE() {
    return 'for-sale';
  }
  static get FOR_PUBLIC_SALE() {
    return 'for-public-sale';
  }
  static get FOR_PRIVATE_SALE() {
    return 'for-private-sale';
  }
  static get FOR_SWAP() {
    return 'for-swap';
  }
  static get FOR_ACCOUNT_SWAP() {
    return 'for-account-swap';
  }
  static get FOR_COIN_SWAP() {
    return 'for-coin-swap';
  }
  static get FOR_SALE_SWAP() {
    return 'for-sale-swap';
  }
  static get NOT_FOR_SALE_SWAP() {
    return 'not-for-sale-swap';
  }
}

module.exports = AccountStatusSearchType;
