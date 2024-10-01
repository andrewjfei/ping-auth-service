import { NextFunction, Request, Response } from "express";

import { AuthRequest, AuthResponse } from "../interfaces";
import { InvalidRequestBodyError } from "../errors";
import { AuthService } from "../services";
import { ResponseStatus } from "../enums";

async function authenticateUser(
    req: Request<null, AuthResponse, AuthRequest>,
    res: Response<AuthResponse>,
    next: NextFunction
): Promise<void> {
    const { username, password } = req.body;

    // validate request
    if (!username || !password) {
        return next(new InvalidRequestBodyError());
    }

    try {
        const jwt: string = await AuthService.authenticateUser(
            username,
            password
        );

        res.status(200).json({ status: ResponseStatus.SUCCESS, jwt });
    } catch (err) {
        next(err);
    }
}

export { authenticateUser };
