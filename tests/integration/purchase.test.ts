import supertest from "supertest";
import httpStatus from "http-status";

import app, { init } from "../../src/app";
import { clearDatabase, endConnection } from "../utils/database";
import { createBasicSettings, createModalities, defineAccommodations } from "../utils/app";
import Purchase from "../../src/entities/Purchase";
import { login } from "../factories/userFactory";
import { createEnrollment } from "../factories/enrollmentFactory";

const agent = supertest(app);

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await clearDatabase();
  await createBasicSettings();
  await createModalities();
  await defineAccommodations();
});

afterAll(async () => {
  await clearDatabase();
  await endConnection();
});

describe("GET /purchase", () => {
  it("should return empty purchase data", async () => {
    const {
      user: { id: userId },
      token,
    } = await login();
    const enrollment = await createEnrollment(userId);
    const body = {
      enrollmentId: 1,
    };

    const response = await agent.get("/purchase").send(body).set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toEqual(httpStatus.NO_CONTENT);
  });

  it("should return user's puchase data", async () => {
    const {
      user: { id: userId },
      token,
    } = await login();
    const enrollment = await createEnrollment(userId);

    const body = {
      modalityId: 1,
      accommodationId: 1,
      enrollmentId: enrollment.id,
    };

    const response = await agent.post("/purchase").send(body).set("Authorization", `Bearer ${token}`);
    expect(response.statusCode).toEqual(httpStatus.OK);

    const purchaseFind = await Purchase.getByEnrollmentId(enrollment.id);

    expect(purchaseFind).toEqual(expect.objectContaining({}));
  });
});

describe("POST /purchase", () => {
  it("should return Ok for successfull purchase", async () => {
    const {
      user: { id: userId },
      token,
    } = await login();
    const enrollment = await createEnrollment(userId);
    const body = {
      modalityId: 1,
      accommodationId: 1,
      enrollmentId: enrollment.id,
    };

    const response = await agent.post("/purchase").send(body).set("Authorization", `Bearer ${token}`);
    expect(response.statusCode).toEqual(httpStatus.OK);
  });

  it("should return invalid params status", async () => {
    const {
      user: { id: userId },
      token,
    } = await login();
    const enrollment = await createEnrollment(userId);
    const body = {
      modalityId: 3,
      accommodationId: 1,
      enrollmentId: enrollment.id,
    };

    const response = await agent.post("/purchase").send(body).set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toEqual(httpStatus.BAD_REQUEST);

    const purchaseFind = await Purchase.getByEnrollmentId(enrollment.id);

    expect(purchaseFind).toEqual(expect.objectContaining({}));
  });
});
