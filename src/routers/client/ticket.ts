import { Router } from "express";

import * as controller from "@/controllers/client/ticket";

import schemaValidatingMiddleware from "@/middlewares/schemaValidatingMiddleware";

import ticketSchema from "@/schemas/ticketSchema";

const router = Router();

router.get("/", controller.getTicketInfo);
router.post("/", schemaValidatingMiddleware(ticketSchema), controller.saveTicketInfo);

export default router;
