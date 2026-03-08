import express from "express";
import { rateResController } from "../controllers/rate-res.controller.js";

const rateResRouter = express.Router();

// POST /api/rate-res - user đánh giá res
rateResRouter.post("/", rateResController.rateRes);

// GET /api/rate-res/user/:userId - danh sách đánh giá theo user
rateResRouter.get("/user/:userId", rateResController.getRatesByUser);

// GET /api/rate-res/res/:resId - danh sách đánh giá theo res (body: userId, resId)
rateResRouter.get("/res/:resId", rateResController.getRatesByRes);

export default rateResRouter;

