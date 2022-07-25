import { Injectable } from "@nestjs/common"
import { Secret, sign, verify, Jwt, JwtPayload } from "jsonwebtoken"
import { ICreateJWT, IVerifyJWT } from "./jwt.type"

@Injectable()
export class JwtService {
    private KEY_JWT: Secret = "Fsdwh wrth w je wre y"

    createJWT({ payload, options = { expiresIn: "15m" } }: ICreateJWT): string {
        return sign(payload, this.KEY_JWT, options)
    }

    verifyJwt({ token, options = {} }: IVerifyJWT): Jwt | JwtPayload | string {
        return verify(token, this.KEY_JWT, options)
    }

}