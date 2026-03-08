import express from "express";
import { orderController } from "../controllers/order.controller.js";

const orderRouter = express.Router();

// POST /api/order - user đặt món
orderRouter.post("/", orderController.createOrder);

// GET /api/order/user/:userId - danh sách order theo user
orderRouter.get("/user/:userId", orderController.getOrdersByUser);

export default orderRouter;
