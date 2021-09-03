import { Router } from "express";

import eventRouter from "@/routers/client/event";
import userRouter from "@/routers/client/user";
import authRouter from "@/routers/client/auth";
import enrollmentRouter from "@/routers/client/enrollment";
import purchaseRouter from "@/routers/client/purchase";

import tokenValidationMiddleware from "@/middlewares/tokenValidationMiddleware";
import requestValidationMiddleware from "@/middlewares/requestValidationMiddleware";

const router = Router();

router.use("/event", eventRouter);
router.use("/users", userRouter);
router.use("/auth", authRouter);
router.use("/enrollments", tokenValidationMiddleware, enrollmentRouter);
router.use("/purchase", tokenValidationMiddleware, requestValidationMiddleware, purchaseRouter);

export default router;
