import jwt from "jsonwebtoken";

function generate(payload: object): string {
    // sign with hmac hashing
    const token: string = jwt.sign(payload, process.env.JWT_SECRET || "secret");

    return token;
}

export { generate };
