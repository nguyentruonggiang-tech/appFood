import { orderService } from "../services/order.service.js";
import { responseSuccess } from "../common/helpers/response.helpers.js";
import { statusCodes } from "../common/helpers/status-code.helper.js";

export const orderController = {
  async createOrder(req, res, next) {
    try {
      const result = await orderService.createOrder(req);
      const response = responseSuccess(result, "Tạo order thành công", statusCodes.CREATED);
      res.status(response.statusCode).json(response);
    } catch (error) {
      next(error);
    }
  },

  async getOrdersByUser(req, res, next) {
    try {
      const result = await orderService.getOrdersByUser(req);
      const response = responseSuccess(result, "Lấy danh sách order theo user thành công", statusCodes.OK);
      res.status(response.statusCode).json(response);
    } catch (error) {
      next(error);
    }
  },
};
