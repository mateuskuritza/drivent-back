import { Router } from "express";

import * as controller from "@/controllers/client/purchase";

import schemaValidatingMiddleware from "@/middlewares/schemaValidatingMiddleware";

import purchaseSchema from "@/schemas/purchaseSchema";

const router = Router();

router.get("/:id", controller.getPurchaseInfo);
router.post("/", schemaValidatingMiddleware(purchaseSchema), controller.savePurchaseInfo);

export default router;
