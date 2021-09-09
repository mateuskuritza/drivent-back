import supertest from "supertest";
import httpStatus from "http-status";

import app, { init } from "../../src/app";
import { clearDatabase, endConnection } from "../utils/database";
import { createBasicSettings, createModalities, defineAccommodations } from "../utils/app";
import Purchase from "../../src/entities/Purchase";
import { login } from "../factories/userFactory";
import { createEnrollment } from "../factories/enrollmentFactory";
import { createPurchase } from "../factories/purchaseFactory";

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

describe("GET /payment", () => {
  it("should return empty purchase data when no enrollment exist.", async () => {
    const {
      user: { id: userId },
      token,
    } = await login();

    const response = await agent.get(`/payment/${userId}`).set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toEqual(httpStatus.NO_CONTENT);
  });

  it("should return empty purchase data when no purchase exist.", async () => {
    const {
      user: { id: userId },
      token,
    } = await login();

    await createEnrollment(userId);

    const response = await agent.get(`/payment/${userId}`).set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toEqual(httpStatus.NO_CONTENT);
  });

  it("should return status OK and purchase data when everthing is correct.", async () => {
    const {
      user: { id: userId },
      token,
    } = await login();

    await createEnrollment(userId);

    await createPurchase(userId, 1, 1);

    const response = await agent.get(`/payment/${userId}`).set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toEqual(httpStatus.OK);
    expect(response.body).toEqual({
      purchase: {
        id: expect.any(Number),
        enrollmentId: expect.any(Number),
        modalityId: 1,
        accommodationId: 1,
        totalPrice: expect.any(Number),
        paymentDone: expect.any(Boolean),
        createdAt: expect.any(String),
        enrollment: expect.anything(),
        accommodation: expect.anything(),
        modality: expect.anything(),
      },
    });
  });
});

describe("POST /payment", () => {
  it("should return bad request status and no purchase was created.", async () => {
    const {
      user: { id: userId },
      token,
    } = await login();

    const body = {
      modalityId: 3,
      accommodationId: 1,
      userId: userId,
    };

    await createEnrollment(userId);

    const response = await agent.post("/payment").send(body).set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toEqual(httpStatus.BAD_REQUEST);

    const purchaseFind = await Purchase.find();

    expect(purchaseFind.length).toEqual(0);
  });

  it("should return status Ok and create a purchase.", async () => {
    const {
      user: { id: userId },
      token,
    } = await login();

    const body = {
      modalityId: 1,
      accommodationId: 1,
      userId: userId,
    };

    await createEnrollment(userId);

    const response = await agent.post("/payment").send(body).set("Authorization", `Bearer ${token}`);
    expect(response.statusCode).toEqual(httpStatus.OK);

    const purchaseFind = await Purchase.find();
    expect(purchaseFind.length).toEqual(1);
  });
});
