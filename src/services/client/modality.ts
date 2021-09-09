import ModalityData from "@/interfaces/modality";
import Modality from "@/entities/Modality";

export async function getModalityInfo() {
  return await Modality.getModalityInfo();
}

export async function updateModalityInfo(data: ModalityData) {
  return await Modality.updateModalityInfo(data);
}
