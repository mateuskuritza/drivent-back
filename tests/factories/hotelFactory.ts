import faker from "faker";

import Hotel from "../../src/entities/Hotel";

export async function createHotel() {
  const hotel = Hotel.create({
    name: faker.name.title(),
    image: faker.image.imageUrl(),
    size: 2,
    vacancies: 0
  });

  await hotel.save();

  return hotel;
}
