import { SignOptions, VerifyOptions } from "jsonwebtoken"

export interface ICreateJWT {
    payload: string | Buffer | object
    options?: SignOptions
}

export interface IVerifyJWT {
    token: string
    options?: VerifyOptions & { complete?: true }
}