import faker from "faker";

import User from "../../src/entities/User";

export async function createUser() {
  const user = User.create({
    email: faker.internet.email(),
    password: "123456",
  });

  await user.save();

  return user;
}
