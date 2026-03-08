import { rateResService } from "../services/rate-res.service.js";
import { responseSuccess } from "../common/helpers/response.helpers.js";
import { statusCodes } from "../common/helpers/status-code.helper.js";

export const rateResController = {
  async rateRes(req, res, next) {
    try {
      const result = await rateResService.rateRes(req);
      const response = responseSuccess(result, "Đánh giá nhà hàng thành công", statusCodes.CREATED);
      res.status(response.statusCode).json(response);
    } catch (error) {
      next(error);
    }
  },

  async getRatesByRes(req, res, next) {
    try {
      const result = await rateResService.getRatesByRes(req);
      const response = responseSuccess(result, "Lấy danh sách đánh giá theo nhà hàng thành công", statusCodes.OK);
      res.status(response.statusCode).json(response);
    } catch (error) {
      next(error);
    }
  },

  async getRatesByUser(req, res, next) {
    try {
      const result = await rateResService.getRatesByUser(req);
      const response = responseSuccess(result, "Lấy danh sách đánh giá theo user thành công", statusCodes.OK);
      res.status(response.statusCode).json(response);
    } catch (error) {
      next(error);
    }
  },
};
