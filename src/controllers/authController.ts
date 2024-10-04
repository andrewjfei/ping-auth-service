import { NextFunction, Request, Response } from "express";

import { AuthRequest, AuthResponse } from "../interfaces";
import { InvalidRequestBodyError } from "../errors";
import { AuthService } from "../services";
import { ResponseStatus } from "../enums";
import { logger } from "../config";

async function authenticateUser(
    req: Request<null, AuthResponse, AuthRequest>,
    res: Response<AuthResponse>,
    next: NextFunction
): Promise<void> {
    const { username, password } = req.body;

    // validate request
    if (!username || !password) {
        return next(new InvalidRequestBodyError("invalid auth request body"));
    }

    try {
        logger.info(`attempting to authenticate user "${username}" ...`);
        
        const jwt: string = await AuthService.authenticateUser(
            username,
            password
        );

        res.status(200).json({ status: ResponseStatus.SUCCESS, jwt });

        logger.info(`successfully authenticated user "${username}"`);
    } catch (err) {
        next(err);
    }
}

export { authenticateUser };
