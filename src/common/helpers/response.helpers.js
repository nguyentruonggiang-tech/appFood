import { statusCodes } from "./status-code.helper.js";

// Chuẩn hóa response success cho toàn bộ API
export const responseSuccess = (data, message = "OK", statusCode = statusCodes.OK) => {
    return {
        status: "success",
        statusCode,
        message,
        data,
    };
};

// Chuẩn hóa response error cho toàn bộ API
export const responseError = (message = "Internal Server Error", statusCode = statusCodes.INTERNAL_SERVER_ERROR, stack = null) => {
    return {
        status: "error",
        statusCode,
        message,
        stack,
    };
};

