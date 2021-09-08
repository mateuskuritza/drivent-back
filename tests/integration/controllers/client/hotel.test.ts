import supertest from "supertest";
import app, { init } from "../../../../src/app";
import * as database from "../../../utils/database";
import * as utils from "../../../utils/app";
import { createFullRoom, createRoom } from "../../../factories/roomFactory";

const test = supertest(app);

beforeAll( async () => {
  await init();
});

afterAll( async () => {
  await database.clearDatabase();
  await utils.createBasicSettings();
  await database.endConnection();
});

beforeEach(async () => {
  await database.clearDatabase();
  await utils.createBasicSettings();
});

async function createUser() {
  const email = "email@gmail.com";
  const password = "123456";
  await test.post("/users").send({ email, password });
  return { email, password };
}

async function loginUser({ email, password }: {email: string, password: string}) {
  const login = await test.post("/auth/sign-in").send({ email, password });
  return login.body.token;
}
  
describe("POST /hotel/:id/rooms", () => {
  function route(id: string): string {
    return `/hotel/${id}/rooms`;
  }
  it("should return status 422 invalid param", async () => {
    const { email, password } = await createUser();
    const token = await loginUser({ email, password });
    const response = await test.post(route("a")).set("Authorization", "Bearer " + token);
    expect(response.statusCode).toBe(422);
  });
  it("should return status 401 invalid token", async () => {
    const response = await test.post(route("1")).set("Authorization", "Bearer " + "123456");
    expect(response.statusCode).toBe(401);
  });
  it("should return status 404 not found id", async () => {
    const { email, password } = await createUser();
    const token = await loginUser({ email, password });
    const response = await test.post(route("999")).set("Authorization", "Bearer " + token);
    expect(response.statusCode).toBe(404);
  });
  it("should return status 409 full room", async () => {
    const { email, password } = await createUser();
    const token = await loginUser({ email, password });
    const newRoom = await createFullRoom();
    const response = await test.post(route(String(newRoom.id))).set("Authorization", "Bearer " + token);
    expect(response.statusCode).toBe(409);
  });
  it("should return status 200 and reserve room", async () => {
    const { email, password } = await createUser();
    const token = await loginUser({ email, password });
    const newRoom = await createRoom();
    const response = await test.post(route(String(newRoom.id))).set("Authorization", "Bearer " + token);
    expect(response.statusCode).toBe(200);
    expect(response.body.available + 1).toBe(newRoom.available);
  });
});
