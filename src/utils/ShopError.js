module.exports = class ShopError extends Error {
  constructor(message, codeStatus) {
    super(message);
    this.message = message;
    this.codeStatus = codeStatus;
  }
};
