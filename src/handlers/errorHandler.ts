import { NextFunction, Request, Response } from "express";
import { PingAuthServiceError, ErrorResponse } from "../interfaces";
import { ErrorCode, ResponseStatus } from "../enums";
import { logger } from "../config";

function errorHandler(
    err: PingAuthServiceError,
    _req: Request,
    res: Response<ErrorResponse>,
    _next: NextFunction
) {
    logger.error(err.message);

    res.status(err.status).json({
        status: ResponseStatus.ERROR,
        error: { code: err.code ? err.code : ErrorCode.Unknown, message: err.message }
    });
}

export default errorHandler;
