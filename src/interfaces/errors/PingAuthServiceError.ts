import { ErrorCode } from "../../enums";

interface PingAuthServiceError {
    status: number; // http status code
    code: ErrorCode; // custom service error code
    message: string; // error message
}

export default PingAuthServiceError;
