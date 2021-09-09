export default class CannotPurchaseAgainError extends Error {
  constructor() {
    super("Your purchase is already confirmed!");

    this.name = "CannotPurchaseAgainError";
  }
}
