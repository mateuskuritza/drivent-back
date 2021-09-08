import faker from "faker";

import Address from "../../src/entities/Address";

export async function createAddress() {
  const address = Address.create({
    cep: "12345-12",
    street: "Rua Dali...",
    city: "NIkity City",
    number: "25-d",
    state: "Rio pra não chorar",
    neighborhood: "Copa",
    addressDetail: "sobrado",
  });

  await address.save();

  return address;
}
