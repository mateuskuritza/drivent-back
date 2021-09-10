import { Router } from "express";

import * as controller from "@/controllers/client/hotel";

const router = Router();

router.get("/", controller.get);
router.get("/user/:roomId", controller.userRoomInfos);
router.get("/:hotelId/rooms", controller.getRooms);
router.post("/:roomId/rooms", controller.reserveRoom);
router.patch("/:roomId/rooms", controller.changeReserve);

export default router;
