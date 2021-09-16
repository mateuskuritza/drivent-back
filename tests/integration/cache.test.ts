import supertest from "supertest";
import app, { init } from "../../src/app";
import * as database from "../utils/database";
import * as utils from "../utils/app";
import { login } from "../factories/userFactory";

const test = supertest(app);

beforeAll(async () => {
  await init();
});

afterAll(async () => {
  await database.clearDatabase();
  await utils.createBasicSettings();
  await database.endConnection();
});

beforeEach(async () => {
  await database.clearDatabase();
  await utils.createBasicSettings();
});

describe("GET /payment/:userId", () => {
  it("should return status 204", async () => {
    const { token } = await login();

    const t1 = Date.now();

    const responseWithoutCaching = await test.get("/payment/1").set("Authorization", "Bearer " + token);
    expect(responseWithoutCaching.statusCode).toBe(204);

    const t2 = Date.now();

    const responseWithCaching = await test.get("/payment/1").set("Authorization", "Bearer " + token);
    expect(responseWithCaching.statusCode).toBe(204);

    const t3 = Date.now();

    const timePassedWithoutCaching = (t2 - t1) / 1000;
    const timePassedWithCaching = (t3 - t2) / 1000;
    expect(timePassedWithCaching < timePassedWithoutCaching / 2).toBe(true);
  });
});
