import supertest from "supertest";
import httpStatus from "http-status";

import app, { init } from "../../src/app";
import { clearDatabase, endConnection } from "../utils/database";
import { createBasicSettings } from "../utils/app";
import { login } from "../factories/userFactory";
import { createEnrollmentData } from "../factories/enrollmentFactory";
import Enrollment from "../../src/entities/Enrollment";

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

describe("POST /enrollment", () => {
  it("should create a new enrollment", async () => {
    const { token } = await login();
    const enrollmentData = createEnrollmentData();

    const response = await agent.post("/enrollments").send(enrollmentData).set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toEqual(httpStatus.OK);

    const enrollments = await Enrollment.find();
    expect(enrollments.length).toEqual(1);
  });

  it("should update an existing enrollment", async () => {
    const { user, token } = await login();
    const enrollmentData = createEnrollmentData();
    await agent.post("/enrollments").send(enrollmentData).set("Authorization", `Bearer ${token}`);

    enrollmentData.name = "new Name";

    const response = await agent.post("/enrollments").send(enrollmentData).set("Authorization", `Bearer ${token}`);
    expect(response.statusCode).toEqual(httpStatus.OK);

    const updatedEnrollment = await Enrollment.findOne({ userId: user.id });
    expect(updatedEnrollment.name).toEqual("new Name");
  });
});
