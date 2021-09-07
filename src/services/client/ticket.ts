import TicketData from "@/interfaces/ticket";
import Ticket from "@/entities/Ticket";

export async function getTicketInfo() {
  return await Ticket.getTicketInfo();
}

export async function newTicketInfo(data: TicketData) {
  return await Ticket.newTicketInfo(data);
}
