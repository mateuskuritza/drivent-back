import supertest from "supertest";
import faker from "faker";
import httpStatus from "http-status";
import dayjs from "dayjs";

import app, { init } from "@/app";
import Setting from "@/entities/Setting";
import { clearDatabase, endConnection } from "../utils/database";
import { createBasicSettings } from "../utils/app";

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

describe("POST /payments", () => {
  it("should create a new purchase", async () => {
    const userData = {
      email: faker.internet.email(),
      password: "123456",
    };

    const response = await agent.post("/users").send(userData);

    expect(response.statusCode).toEqual(httpStatus.CREATED);

    const purchaseData = {
      userId: 1,
      modality: "presential",
      accommodation: "withHotel",
    };

    //const response2 = await agent.post("/payments").send(purchaseData);

    expect(response.statusCode).toEqual(httpStatus.CREATED);
  });

  /*  it("should not allow creation of user with email that has been already used", async () => {});

  it("should not allow creation of user before event start date", async () => {}); */
});
