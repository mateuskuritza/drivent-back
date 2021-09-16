import { Router } from "express";

import * as controller from "@/controllers/client/user";

import schemaValidatingMiddleware from "@/middlewares/schemaValidatingMiddleware";
import createNewUserSchema from "@/schemas/createNewUser";
import tokenValidationMiddleware from "@/middlewares/tokenValidationMiddleware";

import multer from "multer";
import multerConfig from "./config/multer";

const router = Router();

router.post("/", schemaValidatingMiddleware(createNewUserSchema), controller.signUp);
router.post("/photo", tokenValidationMiddleware, multer(multerConfig).single("file"), controller.updatePhoto);
export default router;
