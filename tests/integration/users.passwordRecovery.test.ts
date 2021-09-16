import app, { init } from "../../src/app";
import supertest from "supertest";
import httpStatus from "http-status";
import jwt from "jsonwebtoken";

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

describe("POST /users/password-recovery", () => {
  it("should return status httpStatus_CREATED for a existing email", async () => {
    const user = await createUser();
    const data = {
      email: user.email,
    };

    const response = await agent.post("/users/password-recovery").send(data);
    expect(response.statusCode).toEqual(httpStatus.CREATED);
  });

  it("should return status httpStatus_UNAUTHORIZED for a inexistent email", async () => {
    const data = {
      email: "invalid_user_email@notvalidemail.com",
    };

    const response = await agent.post("/users/password-recovery").send(data);
    expect(response.statusCode).toEqual(httpStatus.UNAUTHORIZED);
    expect(response.body.message).toBe("Esse email não está cadastrado!");
  });
});

describe("PATCH /users/change-password?token=", () => {
  it("should return status httpStatus_CREATED for valid email and token", async () => {
    const user = await createUser();
    const body = { password: "12345678" };
    const recoveryToken = jwt.sign(
      {
        userEmail: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );

    const response = await agent.patch(`/users/change-password?token=${recoveryToken}`).send(body);
    expect(response.statusCode).toEqual(httpStatus.OK);
  });

  it("should return status httpStatus_UNAUTHORIZED for a inexistent email", async () => {
    const data = {
      email: "invalid_user_email@notvalidemail.com",
    };

    const response = await agent.patch("/users/change-password/?token=INVALID_TOKEN").send(data);
    expect(response.statusCode).toEqual(httpStatus.UNAUTHORIZED);
    expect(response.body.message).toBe("This token is no longer valid, request a new one!");
  });
});
