import { Router } from "express";
import { protectConsumer, optionalConsumer } from "../../../middlewares";
import { fileUpload } from "../../../middlewares/file-upload";
import { uploadRateLimiter } from "../../../middlewares/rate-limit";
import {
  createMomentController,
  listMomentsController,
  listMyMomentsController,
  getMomentBySlugController,
} from "./moments.controller";
import likesRouter from "../likes/likes.router";

const router = Router();

router.get("/", optionalConsumer, listMomentsController);
router.get("/mine", protectConsumer, listMyMomentsController);
router.get("/by-slug/:slug", optionalConsumer, getMomentBySlugController);
router.post("/", protectConsumer, uploadRateLimiter, fileUpload("image"), createMomentController);
router.use("/", likesRouter);

export default router;
