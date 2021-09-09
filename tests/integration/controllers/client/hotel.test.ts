import supertest from "supertest";
import app, { init } from "../../../../src/app";
import * as database from "../../../utils/database";
import * as utils from "../../../utils/app";
import { createFullRoom, createRoom } from "../../../factories/roomFactory";
import { createHotel } from "../../../factories/hotelFactory";

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
  return { token: login.body.token, id: login.body.user.id };
}
  
describe("POST /hotel/:id/rooms", () => {
  function route(roomId: string): string {
    return `/hotel/${roomId}/rooms`;
  }
  it("should return status 422 invalid param", async () => {
    const { email, password } = await createUser();
    const { token } = await loginUser({ email, password });
    const response = await test.post(route("a")).set("Authorization", "Bearer " + token);
    expect(response.statusCode).toBe(422);
  });
  it("should return status 401 invalid token", async () => {
    const response = await test.post(route("1")).set("Authorization", "Bearer " + "123456");
    expect(response.statusCode).toBe(401);
  });
  it("should return status 404 not found roomId", async () => {
    const { email, password } = await createUser();
    const { token, id } = await loginUser({ email, password });
    const response = await test.post(route("999")).send({ userId: id }).set("Authorization", "Bearer " + token);
    expect(response.statusCode).toBe(404);
  });
  it("should return status 404 not found userId", async () => {
    const { email, password } = await createUser();
    const newHotel = await createHotel();
    const newRoom = await createRoom(newHotel.id);
    const { token, id } = await loginUser({ email, password });
    const response = await test.post(route(String(newRoom.id))).send({ userId: id + 1 }).set("Authorization", "Bearer " + token);
    expect(response.statusCode).toBe(404);
  });
  it("should return status 409 full room", async () => {
    const { email, password } = await createUser();
    const { token, id } = await loginUser({ email, password });
    const newHotel = await createHotel();
    const newRoom = await createFullRoom(newHotel.id);
    const response = await test.post(route(String(newRoom.id))).send({ userId: id }).set("Authorization", "Bearer " + token);
    expect(response.statusCode).toBe(409);
  });
  it("should return status 200 and reserve room", async () => {
    const newUser = await createUser();
    const { token, id } = await loginUser({ email: newUser.email, password: newUser.password });
    const newHotel = await createHotel();
    const newRoom = await createRoom(newHotel.id);
    const response = await test.post(route(String(newRoom.id))).send({ userId: id }).set("Authorization", "Bearer " + token);
    expect(response.statusCode).toBe(200);
    expect(response.body.available + 1).toBe(newRoom.available);
    expect(response.body.userId).toBe(id);
  });
});

describe("GET /hotel/:id/rooms", () => {
  function route(hotelId: string): string {
    return `/hotel/${hotelId}/rooms`;
  }
  it("should return status 422 invalid param", async () => {
    const { email, password } = await createUser();
    const { token } = await loginUser({ email, password });
    const response = await test.get(route("a")).set("Authorization", "Bearer " + token);
    expect(response.statusCode).toBe(422);
  });
  it("should return status 401 invalid token", async () => {
    const response = await test.get(route("1")).set("Authorization", "Bearer " + "123456");
    expect(response.statusCode).toBe(401);
  });
  it("should return status 404 not found id", async () => {
    const { email, password } = await createUser();
    const { token } = await loginUser({ email, password });
    const response = await test.get(route("999")).set("Authorization", "Bearer " + token);
    expect(response.statusCode).toBe(404);
  });
  it("should return status 200 and rooms", async () => {
    const { email, password } = await createUser();
    const { token } = await loginUser({ email, password });
    const newHotel = await createHotel();
    const newRoom = await createRoom(newHotel.id);
    const response = await test.get(route(String(newHotel.id))).set("Authorization", "Bearer " + token);
    expect(response.statusCode).toBe(200);
    expect(response.body[0]).toEqual(newRoom);
  });
});
  
describe("GET /hotel", () => {
  function route(): string {
    return "/hotel";
  }
  it("should return status 401 invalid token", async () => {
    const response = await test.get(route()).set("Authorization", "Bearer " + "123456");
    expect(response.statusCode).toBe(401);
  });
  it("should return status 200 and hotels", async () => {
    const { email, password } = await createUser();
    const { token } = await loginUser({ email, password });
    const newHotel = await createHotel();
    const newHotel2 = await createHotel();
    const response = await test.get(route()).set("Authorization", "Bearer " + token);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([newHotel, newHotel2]);
  });
});
