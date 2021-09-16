export default class ExpiredPasswordRecoveryToken extends Error {
  constructor() {
    super("O token expirou, solicite um novo!");

    this.name = "ExpiredPasswordRecoveryToken";
  }
}
