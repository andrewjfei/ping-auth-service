import { User } from "@prisma/client";

import Database from "../Database";

class AuthRepository {
    private static _instance: AuthRepository;
    private _database: Database;

    private constructor() {
        this._database = Database.instance();
    }

    static instance(): AuthRepository {
        if (!this._instance) {
            this._instance = new AuthRepository();
        }

        return this._instance;
    }

    async retrieveUserByUsername(username: string): Promise<User | null> {
        const user: User | null = await this._database.client.user.findUnique({
            where: { username }
        });

        return user;
    }
}

export default AuthRepository;
