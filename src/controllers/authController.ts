import { NextFunction, Request, Response } from "express";
import { Logger as WinstonLogger } from "winston";

import { ResponseStatus } from "../enums";
import { InvalidRequestBodyError } from "../errors";
import { AuthRequest, AuthResponse } from "../interfaces";
import { AuthService } from "../services";
import Logger from "../Logger";

class AuthController {
    private static _instance: AuthController;
    private _logger: WinstonLogger;
    private _authService: AuthService;

    private constructor() {
        this._logger = Logger.instance().logger;
        this._authService = AuthService.instance();

        // bind methods to ensure this refers to correct class instance (required to reference class methods in callbacks)
        this.authenticateUser = this.authenticateUser.bind(this);
    }

    static instance(): AuthController {
        if (!this._instance) {
            this._instance = new AuthController();
        }

        return this._instance;
    }

    async authenticateUser(
        req: Request<null, AuthResponse, AuthRequest>,
        res: Response<AuthResponse>,
        next: NextFunction
    ): Promise<void> {
        const { username, password } = req.body;
        
        // validate request
        if (!username || !password) {
            return next(
                new InvalidRequestBodyError("invalid auth request body")
            );
        }

        try {
            this._logger.info(
                `attempting to authenticate user "${username}" ...`
            );

            const jwt: string = await this._authService.authenticateUser(
                username,
                password
            );

            res.status(200).json({ status: ResponseStatus.SUCCESS, jwt });

            this._logger.info(`successfully authenticated user "${username}"`);
        } catch (err) {
            next(err);
        }
    }
}

export default AuthController;
