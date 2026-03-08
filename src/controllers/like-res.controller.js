import { likeResService } from "../services/like-res.service.js";
import { responseSuccess } from "../common/helpers/response.helpers.js";
import { statusCodes } from "../common/helpers/status-code.helper.js";

export const likeResController = {
  async toggleLikeRes(req, res, next) {
    try {
      const result = await likeResService.toggleLikeRes(req);
      const message = result.is_like ? "Like nhà hàng thành công" : "UnLike nhà hàng thành công";
      const response = responseSuccess(null, message, statusCodes.OK);
      res.status(response.statusCode).json(response);
    } catch (error) {
      next(error);
    }
  },

  async getLikesByRes(req, res, next) {
    try {
      const result = await likeResService.getLikesByRes(req);
      const response = responseSuccess(result, "Lấy danh sách like theo nhà hàng thành công", statusCodes.OK);
      res.status(response.statusCode).json(response);
    } catch (error) {
      next(error);
    }
  },

  async getLikesByUser(req, res, next) {
    try {
      const result = await likeResService.getLikesByUser(req);
      const response = responseSuccess(result, "Lấy danh sách like theo user thành công", statusCodes.OK);
      res.status(response.statusCode).json(response);
    } catch (error) {
      next(error);
    }
  },
};
