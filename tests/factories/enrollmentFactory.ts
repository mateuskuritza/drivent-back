import faker from "faker";
import Enrollment from "../../src/entities/Enrollment";
import AddressData from "../../src/interfaces/address";
import EnrollmentData from "../../src/interfaces/enrollment";
import { generateRandomNumberWithLength } from "../utils/helpers";

export async function createEnrollment(userId: number) {
  faker.locale = "pt_BR";
  const phone = faker.phone.phoneNumberFormat();
  const cellPhone = phone.slice(0, 5) + "9" + phone.slice(5);

  const addressData: AddressData = {
    cep: faker.address.zipCode(),
    street: faker.address.streetName(),
    number: faker.datatype.number(1000).toString(),
    neighborhood: faker.address.county(),
    city: faker.address.cityName(),
    state: faker.address.stateAbbr(),
    addressDetail: "house",
  };

  const enrollmentData = {
    name: faker.name.firstName(),
    cpf: generateRandomNumberWithLength(11).replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "$1.$2.$3-$4"),
    birthday: faker.date.past(18, new Date()).toLocaleDateString(),
    phone: cellPhone,
    userId: userId,
  };

  await Enrollment.createOrUpdate({
    ...enrollmentData,
    address: addressData,
  });

  const enrollment = await Enrollment.getByUserIdWithAddress(userId);
  return enrollment;
}

export function createEnrollmentData() {
  faker.locale = "pt_BR";

  const phone = faker.phone.phoneNumberFormat();
  const cellPhone = phone.slice(0, 5) + "9" + phone.slice(5);

  const addressData: AddressData = {
    cep: faker.address.zipCode(),
    street: faker.address.streetName(),
    number: faker.datatype.number(1000).toString(),
    neighborhood: faker.address.county(),
    city: faker.address.cityName(),
    state: faker.address.stateAbbr(),
    addressDetail: "house",
  };

  const personalData = {
    name: faker.name.firstName(),
    cpf: generateRandomNumberWithLength(11).replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "$1.$2.$3-$4"),
    birthday: faker.date.past(18, new Date()).toLocaleDateString(),
    phone: cellPhone,
  };

  const enrollmentData: EnrollmentData = {
    ...personalData,
    address: addressData,
  };

  return enrollmentData;
}
