import faker from "faker";
import User from "../../src/entities/User";
import { signIn } from "../../src/services/client/auth";
import { createNewUser } from "../../src/services/client/user";

export async function createUser() {
  const user = User.create({
    email: faker.internet.email(),
    password: "123456",
  });

  await user.save();

  return user;
}

export async function login() {
  const userData = {
    email: faker.internet.email(),
    password: "123456",
  };
  await createNewUser(userData.email, userData.password);
  const session = await signIn(userData.email, userData.password);
  return session;
}
