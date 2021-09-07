import { Router } from "express";

import * as controller from "@/controllers/client/ticket";

const router = Router();

router.get("/", controller.getTicketInfo);
router.post("/", controller.saveTicketInfo);

export default router;
