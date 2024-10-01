import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function insert() {
    await prisma.user.create({
        data: {
            username: "joebloggs",
            email: "joebloggs@ping.com",
            password: "password"
        }
    });
}

async function main() {
    try {
        await insert();
    } catch (err) {
        console.error(err);
    } finally {
        prisma.$disconnect();
    }
}

main();
