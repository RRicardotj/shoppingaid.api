module.exports = class ShopError extends Error {
  constructor(message, codeStatus) {
    this.message = message;
    this.codeStatus = codeStatus;
  }
};
