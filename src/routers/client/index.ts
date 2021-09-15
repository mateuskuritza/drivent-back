import { Router } from "express";

import eventRouter from "@/routers/client/event";
import userRouter from "@/routers/client/user";
import authRouter from "@/routers/client/auth";
import enrollmentRouter from "@/routers/client/enrollment";
import purchaseRouter from "@/routers/client/purchase";
import hotelRouter from "@/routers/client/hotel";
import activityRouter from "@/routers/client/activity";

import tokenValidationMiddleware from "@/middlewares/tokenValidationMiddleware";
import requestValidationMiddleware from "@/middlewares/requestValidationMiddleware";

const router = Router();

router.use("/event", eventRouter);
router.use("/users", userRouter);
router.use("/auth", authRouter);
router.use("/enrollments", tokenValidationMiddleware, enrollmentRouter);
router.use("/payment", tokenValidationMiddleware, requestValidationMiddleware, purchaseRouter);
router.use("/hotel", tokenValidationMiddleware, hotelRouter);
router.use("/activities", tokenValidationMiddleware, activityRouter);

export default router;
