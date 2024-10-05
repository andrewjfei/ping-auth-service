import { PrismaClient } from "@prisma/client";
import {
    PostgreSqlContainer,
    StartedPostgreSqlContainer
} from "@testcontainers/postgresql";
import axios, { AxiosError, AxiosResponse } from "axios";

import RepsonseStatus from "../../src/enums/ResponseStatus";
import { ErrorCode } from "../../src/enums";
import { AuthRequest } from "../../src/interfaces";
import { DatabaseConfig } from "../../src/config";
import { Server } from "http";
import App from "../../src/App";
import Database from "../../src/Database";

describe("auth routes", () => {
    jest.setTimeout(6000);

    const url: string = `http://${process.env.HOSTNAME}:${process.env.PORT}/api/v1/auth`;

    let postgresqlContainer: StartedPostgreSqlContainer;
    let prismaClient: PrismaClient;
    let pingAuthService: Server;

    beforeAll(async () => {
        // start postgres test container
        postgresqlContainer = await new PostgreSqlContainer(
            "postgres:16-alpine"
        )
            .withUsername("test")
            .withPassword("password")
            .withDatabase("ping")
            .start();

        // set database url in config for prisma connections
        const databaseConfig = new DatabaseConfig(postgresqlContainer.getConnectionUri());
        Database.instance().config = databaseConfig;

        // get prisma client
        prismaClient = Database.instance().client;

        // create tables manually (since we cant use prisma migration script from within code)
        await createTables(prismaClient);
        await createUser(
            prismaClient,
            "jimmychan",
            "jimmychan@ping.com",
            "password"
        );

        // start ping auth service
        pingAuthService = App.instance().start();
    });

    afterAll(async () => {
        pingAuthService?.close();
        await prismaClient?.$disconnect();
        await postgresqlContainer?.stop();
    });

    test("invalid request body should return error code 100", async () => {
        try {
            const body = { username: "jimmychan" };

            await axios.post(url, body);

            throw new Error("request should not succeed");
        } catch (err) {
            if (err instanceof AxiosError) {
                const res: AxiosResponse = err.response as AxiosResponse;

                expect(res.status).toBe(400);
                expect(res.data.status).toEqual(RepsonseStatus.ERROR);
                expect(res.data.error.code).toEqual(
                    ErrorCode.InvalidRequestBody
                );
            }
        }
    });

    test("invalid credentials should return error code 200", async () => {
        try {
            const body: AuthRequest = {
                username: "jimmychan",
                password: "incorrect"
            };

            await axios.post(url, body);

            throw new Error("request should not succeed");
        } catch (err) {
            if (err instanceof AxiosError) {
                const res: AxiosResponse = err.response as AxiosResponse;

                expect(res.status).toBe(401);
                expect(res.data.status).toEqual(RepsonseStatus.ERROR);
                expect(res.data.error.code).toEqual(
                    ErrorCode.InvalidCredentials
                );
            }
        }
    });

    test("valid credentials should return jwt", async () => {
        try {
            const body: AuthRequest = {
                username: "jimmychan",
                password: "password"
            };

            const res: AxiosResponse = await axios.post(url, body);

            expect(res.status).toBe(200);
            expect(res.data.jwt).toBeDefined();
        } catch (_err) {
            throw new Error("request should not fail");
        }
    });
});

async function createTables(prismaClient: PrismaClient): Promise<void> {
    // create user table
    await prismaClient.$executeRaw`CREATE TABLE "user" (
        "id" TEXT NOT NULL,
        "username" TEXT NOT NULL UNIQUE,
        "email" TEXT NOT NULL,
        "password" TEXT NOT NULL,
        "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "lastUpdated" TIMESTAMP(3) NOT NULL,
        CONSTRAINT "user_pkey" PRIMARY KEY ("id"));`;
}

async function createUser(
    prismaClient: PrismaClient,
    username: string,
    email: string,
    password: string
): Promise<void> {
    await prismaClient.user.create({
        data: {
            username,
            email,
            password
        }
    });
}
