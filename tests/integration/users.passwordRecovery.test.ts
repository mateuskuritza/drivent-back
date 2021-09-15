import supertest from "supertest";
import httpStatus from "http-status";

import app, { init } from "../../src/app";
import Setting from "../../src/entities/Setting";
import User from "../../src/entities/User";
import { clearDatabase, endConnection } from "../utils/database";
import { createBasicSettings } from "../utils/app";
import { createUser } from "../factories/userFactory";

const agent = supertest(app);

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await clearDatabase();
  await createBasicSettings();
});

afterAll(async () => {
  await clearDatabase();
  await endConnection();
});

("/users/password-recovery");

describe("POST /users", () => {
  it("should create a new user", async () => {
    return;
  });
});
