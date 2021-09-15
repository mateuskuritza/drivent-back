import { Router } from "express";

import * as controller from "@/controllers/client/activity";

const router = Router();

router.get("/activities", controller.getActivitiesInfo);
router.post("/activities", controller.saveActivityInfo);
export default router;
