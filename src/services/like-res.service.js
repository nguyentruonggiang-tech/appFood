import { prisma } from "../common/prisma/connect.prisma.js";
import { NotFoundException } from "../common/helpers/exception.helpers.js";
import { buildQueryPrisma } from "../common/helpers/build-query-primsa.helper.js";
import { toInt } from "../common/helpers/convert.helper.js";

export const likeResService = {
  async toggleLikeRes(req) {
    const userId = toInt(req.body.userId, "userId");
    const resId = toInt(req.body.resId, "resId");

    // Kiểm tra tồn tại user và res để tránh like dữ liệu ảo
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
    const existing = await prisma.like_res.findUnique({ where: whereExist });

    // Nếu chưa có -> tạo mới với is_like = true
    if (!existing) {
      const created = await prisma.like_res.create({
        data: {
          user_id: userId,
          res_id: resId,
          is_like: true,
        },
      });
      return created;
    }

    // Nếu đã có -> đảo trạng thái is_like
    const toggled = await prisma.like_res.update({
      where: whereExist,
      data: {
        is_like: !existing.is_like,
        date_like: new Date(),
      },
    });

    return toggled;
  },

  async getLikesByRes(req) {
    const resId = toInt(req.params.resId, "resId");
    const { skip, take, page, pageSize, where: filterWhere } = buildQueryPrisma(req);

    const [data, totalItem] = await Promise.all([
      prisma.like_res.findMany({
        where: {
          res_id: resId,
          is_like: true,
          ...filterWhere,
        },
        include: {
          users: true,
        },
        skip,
        take,
      }),
      prisma.like_res.count({
        where: {
          res_id: resId,
          is_like: true,
          ...filterWhere,
        },
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

  async getLikesByUser(req) {
    const userId = toInt(req.params.userId, "userId");
    const { page, pageSize, index, where } = buildQueryPrisma(req);
   
    const whereQuery = {
      user_id: userId,
      is_like: true,
      ...where,
    };

    const [data, totalItem] = await Promise.all([
      prisma.like_res.findMany({
        where: whereQuery,
        include: {
          restaurants: true,
        },
        skip: index,
        take: pageSize,
      }),
      prisma.like_res.count({
        where: whereQuery
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

