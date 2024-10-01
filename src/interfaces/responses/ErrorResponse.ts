import { PingResponse } from ".";
import { ErrorCode, ResponseStatus } from "../../enums";

interface ErrorResponse extends PingResponse {
    status: ResponseStatus;
    error: { code: ErrorCode, message: string };
}

export default ErrorResponse;

