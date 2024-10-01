import { ErrorCode } from "../enums";
import { PingAuthServiceError } from "../interfaces";

class InvalidRequestBodyError implements PingAuthServiceError {
    status: number;
    code: ErrorCode;
    message: string;

    constructor() {
        this.status = 400;
        this.code = ErrorCode.InvalidRequestBody;
        this.message = "invalid request body";
    }
}

export default InvalidRequestBodyError;
