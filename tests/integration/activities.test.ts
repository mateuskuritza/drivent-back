import supertest from "supertest";
import app, { init } from "../../src/app";
import * as database from "../utils/database";
import * as utils from "../utils/app";
import { login } from "../factories/userFactory";
import * as activityFactory from "../factories/activityFactory";

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

describe("GET /activities", () => {
  it("should return status 401 invalid token", async () => {
    const response = await test.get("/activities").set("Authorization", "Bearer " + "123456");
    expect(response.statusCode).toBe(401);
  });
  it("should return status 204 no activities found", async () => {
    const { token } = await login();
    const response = await test.get("/activities").set("Authorization", "Bearer " + token);
    expect(response.statusCode).toBe(204);
  });
  it("should return status 200 with activities", async () => {
    const { token, user } = await login();
    const eventDate = await activityFactory.createEventDay();
    const location = await activityFactory.createLocation();
    const activity = await activityFactory.create(eventDate.id, location.id);
    await activityFactory.registerUserToActivity(user.id, activity.id);
    const body = { userId: user.id, activityId: activity.id };
    const response = await test
      .get("/activities")
      .send(body)
      .set("Authorization", "Bearer " + token);
    expect(response.body.activities[0].id).toEqual(activity.id);
  });
});

describe("POST /activities", () => {
  it("should return status 401 invalid token", async () => {
    const response = await test.get("/activities").set("Authorization", "Bearer " + "123456");
    expect(response.statusCode).toBe(401);
  });
  it("should return status 400 invalid userId", async () => {
    const { token } = await login();
    const body = { userId: "a", activityId: 1 };
    const response = await test
      .post("/activities")
      .send(body)
      .set("Authorization", "Bearer " + token);
    expect(response.statusCode).toBe(400);
  });
  it("should return status 400 invalid activityId", async () => {
    const { token } = await login();
    const body = { userId: 1, activityId: "a" };
    const response = await test
      .post("/activities")
      .send(body)
      .set("Authorization", "Bearer " + token);
    expect(response.statusCode).toBe(400);
  });
  it("should return status 200 with activities", async () => {
    const { token, user } = await login();
    const eventDate = await activityFactory.createEventDay();
    const location = await activityFactory.createLocation();
    const activity = await activityFactory.create(eventDate.id, location.id);
    const body = { userId: user.id, activityId: activity.id };
    const response = await test
      .post("/activities")
      .send(body)
      .set("Authorization", "Bearer " + token);
    expect(response.statusCode).toBe(200);
  });
});
