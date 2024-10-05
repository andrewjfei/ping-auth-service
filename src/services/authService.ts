import { User } from "@prisma/client";

import { AuthRepository } from "../repositories";
import { InvalidCredentialsError } from "../errors";
import { JwtUtil } from "../utils";

class AuthService {
    private static _instance: AuthService;
    private _authRepository: AuthRepository;

    private constructor() {
        this._authRepository = AuthRepository.instance();
    }

    static instance(): AuthService {
        if (!this._instance) {
            this._instance = new AuthService();
        }

        return this._instance;
    }

    async authenticateUser(
        username: string,
        password: string
    ): Promise<string> {
        const user: User | null =
            await this._authRepository.retrieveUserByUsername(username);

        // validate credentials
        if (user === null || password !== user.password) {
            throw new InvalidCredentialsError("invalid auth credentials");
        }

        return JwtUtil.generate(user);
    }
}

export default AuthService;
