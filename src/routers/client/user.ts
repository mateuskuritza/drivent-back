import { Router } from "express";

import * as controller from "@/controllers/client/user";

import schemaValidatingMiddleware from "@/middlewares/schemaValidatingMiddleware";
import createNewUserSchema from "@/schemas/createNewUser";
import resetPasswordSchema from "@/schemas/resetPassword";
import changePasswordSchema from "@/schemas/changePassword";
import { passwordRecoveryTokenValidationMiddleware } from "@/middlewares/passwordRecoveryTokenValidationMiddleware";

const router = Router();

router.post("/", schemaValidatingMiddleware(createNewUserSchema), controller.signUp);
router.post("/password-recovery", schemaValidatingMiddleware(resetPasswordSchema), controller.resetPassword);
router.patch(
  "/change-password",
  passwordRecoveryTokenValidationMiddleware,
  schemaValidatingMiddleware(changePasswordSchema),
  controller.changePassword,
);

export default router;
