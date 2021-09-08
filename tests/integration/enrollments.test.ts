import supertest from "supertest";
import faker from "faker";
import httpStatus from "http-status";
import dayjs from "dayjs";

import app, { init } from "../../src/app";
import Setting from "../../src/entities/Setting";
import User from "../../src/entities/User";
import { clearDatabase, endConnection } from "../utils/database";
import { createBasicSettings } from "../utils/app";
import { createUser } from "../factories/userFactory";
import { createEnrollment } from "../factories/enrollmentFactory";

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

describe("POST /enrollments", () => {
  it("should create a new enrollment", async () => {
    /* const newUser = createUser();

    const enrollmentData = {};

    console.log(newUser);

    expect(response.body).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        email: userData.email,
        createdAt: expect.any(String),
      }),
    ); */
  });
});
