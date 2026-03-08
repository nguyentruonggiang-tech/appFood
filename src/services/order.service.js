import { prisma } from "../common/prisma/connect.prisma.js";
import { BadRequestException, NotFoundException } from "../common/helpers/exception.helpers.js";
import { toInt } from "../common/helpers/convert.helper.js";

export const orderService = {
  async createOrder(req) {
    const body = req.body ?? {};
    const userId = toInt(body.userId, "userId");
    const foodId = toInt(body.foodId, "foodId");
    const amount = toInt(body.amount, "amount");
    const code = body.code?.toString().trim();
    const arrSubId = body.arrSubId?.toString().trim() ?? "";

    if (!code) {
      throw new BadRequestException("code là bắt buộc");
    }

    const [user, food] = await Promise.all([
      prisma.users.findUnique({ where: { user_id: userId } }),
      prisma.foods.findUnique({ where: { food_id: foodId } }),
    ]);
    if (!user) throw new NotFoundException("User không tồn tại");
    if (!food) throw new NotFoundException("Món ăn không tồn tại");

    const whereExist = {
      user_id_food_id: {
        user_id: userId,
        food_id: foodId,
      },
    };

    const existing = await prisma.orders.findUnique({
      where: whereExist,
    });

    // Chưa có đơn (user, food) -> tạo mới
    if (!existing) {
      const created = await prisma.orders.create({
        data: {
          user_id: userId,
          food_id: foodId,
          amount,
          code,
          arr_sub_id: arrSubId,
        },
      });
      return created;
    }

    // Đã có -> cập nhật amount, code, arr_sub_id
    const updated = await prisma.orders.update({
      where: whereExist,
      data: {
        amount,
        code,
        arr_sub_id: arrSubId,
      },
    });

    return updated;
  },

  async getOrdersByUser(req) {
    const userId = toInt(req.params.userId, "userId");

    const orders = await prisma.orders.findMany({
      where: {
        user_id: userId,
      },
      include: {
        foods: true,
      },
    });

    return orders;
  },
};

