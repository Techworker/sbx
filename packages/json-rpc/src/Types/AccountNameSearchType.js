class AccountNameSearchType
{
  static get EXACT() {
    return 'exact';
  }
  static get STARTS_WITH() {
    return 'startswith';
  }
  static get NOT_STARTS_WITH() {
    return 'not-startswith';
  }
  static get CONTAINS() {
    return 'contains';
  }
  static get NOT_CONTAINS() {
    return 'not-contains';
  }
  static get ENDS_WITH() {
    return 'endswith';
  }
  static get NOT_ENDS_WITH() {
    return 'not-endswith';
  }
}

module.exports = AccountNameSearchType;
