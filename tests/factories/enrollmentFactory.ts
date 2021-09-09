import faker from "faker";
import Enrollment from "../../src/entities/Enrollment";
import AddressData from "../../src/interfaces/address";
import { generateRandomNumberWithLength } from "../utils/helpers";

export async function createEnrollment(userId: number) {
  faker.locale = "pt_BR";

  const addressData: AddressData = {
    cep: faker.address.zipCode(),
    street: faker.address.streetName(),
    number: faker.datatype.number(1000).toString(),
    neighborhood: faker.address.county(),
    city: faker.address.cityName(),
    state: faker.address.state(),
    addressDetail: "house",
  };

  const enrollmentData = {
    name: faker.name.firstName(),
    cpf: generateRandomNumberWithLength(11),
    birthday: faker.date.past(18, new Date()).toDateString(),
    phone: faker.phone.phoneNumber(),
    userId: userId,
  };

  await Enrollment.createOrUpdate({
    ...enrollmentData,
    address: addressData,
  });

  const enrollment = await Enrollment.getByUserIdWithAddress(userId);
  return enrollment;
}
