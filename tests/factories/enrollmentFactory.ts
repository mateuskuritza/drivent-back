import faker from "faker";

import Enrollment from "../../src/entities/Enrollment";
import * as addressFactory from "./addressFactory";
/* interface EnrollmentData {
  name: string;
  cpf: string;
  birthday: string;
  address: AddressData;
  phone: string;
  userId: number;
} */

export async function createEnrollment() {
  const enrollment = Enrollment.create({
    name: "lucas",
    cpf: "123.123.123-12",
    birthday: "10/10/2010",
    address: addressFactory.createAddress(),
    phone: "123-123-123",
    userId: 1,
  });
}
