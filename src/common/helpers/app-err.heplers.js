import { responseError } from "./response.helpers.js";

export const appErr = (err, req, res, next) => {
    console.error("[appFood][Error middleware]", err);
    const response = responseError(err?.message, err?.code, err?.stack);
    res.status(response.statusCode).json(response);
};

