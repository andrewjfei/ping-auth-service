import { User } from "@prisma/client";
import { DatabaseConfig } from "../config";

async function retrieveUserByUsername(username: string): Promise<User | null> {

    const user: User | null = await DatabaseConfig.instance().client.user.findUnique({
        where: { username }
    });

    return user;
}

export { retrieveUserByUsername };
