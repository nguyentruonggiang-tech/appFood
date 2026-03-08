import { statusCodes } from "./status-code.helper.js";

//400
export class BadRequestException extends Error {
    code =  statusCodes.BAD_REQUEST;
    name = "BadRequestException"
    constructor(message = "BadRequestException") {
        super(message);
    }
}

//404
export class NotFoundException extends Error {
    code =  statusCodes.NOT_FOUND;
    name = "NotFoundException"
    constructor(message = "NotFoundException") {
        super(message);
    }
}