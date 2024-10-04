import { ErrorCode } from "../enums";
import { PingAuthServiceError } from "../interfaces";

class InvalidRequestBodyError implements PingAuthServiceError {
    status: number;
    code: ErrorCode;
    message: string;

    constructor(message: string = "invalid request body") {
        this.status = 400;
        this.code = ErrorCode.InvalidRequestBody;
        this.message = message;
    }
}

export default InvalidRequestBodyError;
