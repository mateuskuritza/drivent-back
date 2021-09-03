import { Router } from "express";

import * as controller from "@/controllers/client/hotel";

const router = Router();

router.get("/", controller.get);
router.get("/:id/rooms", controller.getRooms);
router.post("/:id/rooms", controller.reserveRoom);

export default router;
