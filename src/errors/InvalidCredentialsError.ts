import { ErrorCode } from "../enums";
import { PingAuthServiceError } from "../interfaces";

class InvalidCredentialsError implements PingAuthServiceError {
    status: number;
    code: ErrorCode;
    message: string;

    constructor(message: string = "invalid credentials") {
        this.status = 401;
        this.code = ErrorCode.InvalidCredentials;
        this.message = message;
    }
}

export default InvalidCredentialsError;

