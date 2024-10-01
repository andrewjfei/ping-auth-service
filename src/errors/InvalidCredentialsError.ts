import { ErrorCode } from "../enums";
import { PingAuthServiceError } from "../interfaces";

class InvalidCredentialsError implements PingAuthServiceError {
    status: number;
    code: ErrorCode;
    message: string;

    constructor() {
        this.status = 401;
        this.code = ErrorCode.InvalidCredentials;
        this.message = "invalid credentials";
    }
}

export default InvalidCredentialsError;

