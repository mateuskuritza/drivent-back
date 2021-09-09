import { Router } from "express";
import schemaValidatingMiddleware from "@/middlewares/schemaValidatingMiddleware";

import purchaseSchema from "@/schemas/purchaseSchema";

import * as controller from "@/controllers/client/purchase";

const router = Router();

router.get("/:id", controller.getPurchaseInfo);
router.post("/", schemaValidatingMiddleware(purchaseSchema), controller.savePurchaseInfo);

export default router;
