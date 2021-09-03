import { Router } from "express";

import * as controller from "@/controllers/client/purchase";

const router = Router();

router.get("/", controller.getPaymentInfo);

export default router;
