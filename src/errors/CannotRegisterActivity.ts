export default class CannotRegisterActivity extends Error {
  constructor() {
    super("Time conflict! Cannot enroll in this activity.");

    this.name = "CannotRegisterActivityError";
  }
}
