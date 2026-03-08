export const buildQueryPrisma = (req) => {
  let { page, pageSize, filters } = req.query
  const pageDefault = 1
  const pageSizeDefault = 3

  // Đảm bảo page, pageSize là số hợp lệ
  page = Number(page) || pageDefault
  pageSize = Number(pageSize) || pageSizeDefault
  if (page < 1) page = pageDefault
  if (pageSize < 1) pageSize = pageSizeDefault

  const index = (page - 1) * pageSize

  // Parse filters: chỉ parse khi là string, tránh JSON.parse(undefined)
  if (typeof filters === 'string') {
    try {
      filters = JSON.parse(filters)
    } catch {
      filters = {}
    }
  } else {
    filters = {}
  }

  // Giá trị string trong filter → dùng contains (tìm kiếm partial)
  Object.entries(filters).forEach(([key, value]) => {
    if (typeof value === 'string') {
      filters[key] = { contains: value }
    }
  })

  const where = {
    ...filters
  }

  return {
    page,
    pageSize,
    index,
    where
  }
}