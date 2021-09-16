export default class ExpiredPasswordRecoveryToken extends Error {
  constructor() {
    super("This token is no longer valid, request a new one!");

    this.name = "ExpiredPasswordRecoveryToken";
  }
}
