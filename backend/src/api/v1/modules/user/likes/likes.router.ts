import { Router } from "express";
import { protectConsumer } from "../../../middlewares";
import { toggleLikeController } from "./likes.controller";

const router = Router();

router.post("/:id/like", protectConsumer, toggleLikeController);

export default router;
