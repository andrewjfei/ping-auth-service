import { PingResponse } from ".";
import { ResponseStatus } from "../../enums";

interface AuthResponse extends PingResponse {
    status: ResponseStatus;
    jwt: string;
}

export default AuthResponse;
