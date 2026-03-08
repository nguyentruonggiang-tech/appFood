import express from "express";
import { likeResController } from "../controllers/like-res.controller.js";

const likeResRouter = express.Router();

// RESTful: route có literal (users, res) khai báo trước để tránh match nhầm param

// GET /api/like-res/users/:userId — danh sách nhà hàng mà user đã like
likeResRouter.get("/user/:userId", likeResController.getLikesByUser);

// GET /api/like-res/res/:resId — danh sách user đã like nhà hàng
likeResRouter.get("/res/:resId", likeResController.getLikesByRes);

// POST /api/like-res/toggle — toggle like (body: userId, resId)
likeResRouter.post("/toggle", likeResController.toggleLikeRes);

export default likeResRouter;

