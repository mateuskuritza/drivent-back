import Setting from "../../src/entities/Setting";
import Modality from "../../src/entities/Modality";
import Accommodation from "../../src/entities/Accommodation";
import Purchase from "../../src/entities/Purchase";
import PurchaseData from "../../src/interfaces/purchase";

export async function createBasicSettings() {
  const startDate = Setting.create({ name: "start_date", value: new Date().toISOString() });
  const endDate = Setting.create({ name: "end_date", value: new Date().toISOString() });
  const eventTitle = Setting.create({ name: "event_title", value: "Test Event" });
  const backgroundImage = Setting.create({ name: "background_image", value: "red" });
  const logoImage = Setting.create({ name: "logo_image", value: "logo.png" });

  await Setting.save([startDate, endDate, eventTitle, backgroundImage, logoImage]);

  return {
    startDate,
    endDate,
    eventTitle,
    backgroundImage,
    logoImage,
  };
}

interface ModalityInterface {
  name: string;
  totalVacancy: number;
  availableVacancy: number;
  price: number;
}

export async function createModalities() {
  const presential: ModalityInterface = { name: "presential", price: 25000, totalVacancy: 20, availableVacancy: 20 };
  const online: ModalityInterface = { name: "online", price: 10000, totalVacancy: null, availableVacancy: null };
  await Modality.createQueryBuilder().insert().into(Modality).values([presential, online]).execute();
  return;
}

export async function defineAccommodations() {
  const withoutHotel = { name: "withoutHotel", price: 0 };
  const withHotel = { name: "withHotel", price: 35000 };
  await Accommodation.createQueryBuilder().insert().into(Accommodation).values([withoutHotel, withHotel]).execute();
  return;
}

export async function insertPurchase(purchaseData: PurchaseData) {
  await Purchase.createOrUpdatePayment(purchaseData);
}
