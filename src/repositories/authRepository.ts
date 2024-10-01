import { PrismaClient, User } from "@prisma/client";

async function retrieveUserByUsername(username: string): Promise<User | null> {
    const prisma = new PrismaClient();

    const user: User | null = await prisma.user.findUnique({
        where: { username }
    });

    return user;
}

export { retrieveUserByUsername };
