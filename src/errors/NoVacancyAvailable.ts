export default class NoVacancyAvailable extends Error {
  constructor() {
    super("Cannot book, no vacancy available.");

    this.name = "NoVacancyAvailableError";
  }
}
