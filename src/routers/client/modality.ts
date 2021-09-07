import { Router } from "express";

import * as controller from "@/controllers/client/modality";

const router = Router();

router.get("/", controller.getModalityInfo);
router.post("/", controller.saveModalityInfo);

export default router;
