import { prisma } from "../common/prisma/connect.prisma.js";
import { BadRequestException, NotFoundException } from "../common/helpers/exception.helpers.js";
import { buildQueryPrisma } from "../common/helpers/build-query-primsa.helper.js";
import { toInt } from "../common/helpers/convert.helper.js";

export const rateResService = {
  async rateRes(req) {
    const userId = toInt(req.body.userId, "userId");
    const resId = toInt(req.body.resId, "resId");
    const amount = toInt(req.body.amount, "amount");

    if (amount < 1 || amount > 5) {
      throw new BadRequestException("amount phải nằm trong khoảng 1-5");
    }

    const [user, resRecord] = await Promise.all([
      prisma.users.findUnique({ where: { user_id: userId } }),
      prisma.restaurants.findUnique({ where: { res_id: resId } }),
    ]);
    if (!user) throw new NotFoundException("User không tồn tại");
    if (!resRecord) throw new NotFoundException("Nhà hàng không tồn tại");

    const whereExist = {
      user_id_res_id: {
        user_id: userId,
        res_id: resId,
      },
    };

    const existing = await prisma.rate_res.findUnique({
      where: whereExist,
    });

    // Chưa có -> tạo mới
    if (!existing) {
      const created = await prisma.rate_res.create({
        data: {
          user_id: userId,
          res_id: resId,
          amount,
        },
      });
      return created;
    }

    // Đã có -> cập nhật số sao và thời gian
    const updated = await prisma.rate_res.update({
      where: whereExist,
      data: {
        amount,
        date_rate: new Date(),
      },
    });

    return updated;
  },

  async getRatesByRes(req) {
    const resId = toInt(req.params.resId, "resId");
    const { page, pageSize, index, where } = buildQueryPrisma(req);

    const whereQuery = {
      res_id: resId,
      ...where,
    };

    const [data, totalItem] = await Promise.all([
      prisma.rate_res.findMany({
        where: whereQuery,
        include: {
          users: true,
        },
        skip: index,
        take: pageSize,
      }),
      prisma.rate_res.count({
        where: whereQuery,
      }),
    ]);

    return {
      pagination: {
        page,
        pageSize,
        totalItem,
        totalPage: Math.ceil(totalItem / pageSize),
      },
      items: data,
    };
  },

  async getRatesByUser(req) {
    const userId = toInt(req.params.userId, "userId");
    const { page, pageSize, index, where } = buildQueryPrisma(req);
    const whereQuery = {
      user_id: userId,
      ...where,
    };

    const [data, totalItem] = await Promise.all([
      prisma.rate_res.findMany({
        where: whereQuery,
        include: {
          restaurants: true,
        },
        skip: index,
        take: pageSize,
      }),
      prisma.rate_res.count({
        where: whereQuery,
      }),
    ]);

    return {
      pagination: {
        page,
        pageSize,
        totalItem,
        totalPage: Math.ceil(totalItem / pageSize),
      },
      items: data,
    };
  },
};

