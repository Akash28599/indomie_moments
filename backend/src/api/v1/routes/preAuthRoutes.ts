import { Router } from "express";
import userAuthRouter from "../modules/user/auth/auth.router";
import adminAuthRouter from "../modules/admin/auth/auth.router";
import userRouter from "./user.router";
import cronRouter from "../modules/cron/cron.routes";

const router = Router();


router.use("/auth", userAuthRouter);
router.use("/admin/auth", adminAuthRouter);
router.use("/cron", cronRouter); 
router.use("/", userRouter);

export default router;