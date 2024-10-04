import { User } from "@prisma/client";

import { AuthRepository } from "../repositories";
import { InvalidCredentialsError } from "../errors";
import { JwtUtil } from "../utils";

async function authenticateUser(
    username: string,
    password: string
): Promise<string> {
    const user: User | null =
        await AuthRepository.retrieveUserByUsername(username);

    // validate credentials
    if (user === null || password !== user.password) {
        throw new InvalidCredentialsError("invalid auth credentials");
    }

    return JwtUtil.generate(user);
}

export { authenticateUser };
