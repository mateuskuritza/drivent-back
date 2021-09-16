import { Router } from "express";

import * as controller from "@/controllers/client/user";

import schemaValidatingMiddleware from "@/middlewares/schemaValidatingMiddleware";
import createNewUserSchema from "@/schemas/createNewUser";
import resetPasswordSchema from "@/schemas/resetPassword";
import changePasswordSchema from "@/schemas/changePassword";
import { passwordRecoveryTokenValidationMiddleware } from "@/middlewares/passwordRecoveryTokenValidationMiddleware";
import tokenValidationMiddleware from "@/middlewares/tokenValidationMiddleware";

import multerConfig from "./config/multer";
import multer from "multer";

const router = Router();

router.post("/", schemaValidatingMiddleware(createNewUserSchema), controller.signUp);
router.post("/password-recovery", schemaValidatingMiddleware(resetPasswordSchema), controller.resetPassword);
router.patch(
  "/change-password",
  passwordRecoveryTokenValidationMiddleware,
  schemaValidatingMiddleware(changePasswordSchema),
  controller.changePassword,
);

router.post("/photo", tokenValidationMiddleware, multer(multerConfig).single("file"), controller.updatePhoto);
export default router;
