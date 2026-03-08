import express from "express";
import likeResRouter from "./like-res.router.js";
import rateResRouter from "./rate-res.router.js";
import orderRouter from "./order.router.js";

const rootRouter = express.Router();

rootRouter.use("/like-res", likeResRouter);
rootRouter.use("/rate-res", rateResRouter);
rootRouter.use("/order", orderRouter);

export default rootRouter;
