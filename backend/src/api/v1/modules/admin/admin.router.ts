import { Router } from "express";
import dashboardRouter from "./dashboard/dashboard.router";
import campaignsRouter from "./campaigns/campaigns.router";
import registrationsRouter from "./registrations/registrations.router";
import adminMomentsRouter from "./moments/admin-moments.router";

const router = Router();

router.use("/dashboard", dashboardRouter);
router.use("/campaigns", campaignsRouter);
router.use("/users", registrationsRouter);
router.use("/moments", adminMomentsRouter);

export default router;
