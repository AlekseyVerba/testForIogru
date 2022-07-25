import { NestMiddleware, Injectable } from "@nestjs/common"
import { Request, Response, NextFunction } from "express"
import { JwtService } from "../jwt/jwt.service"
import { IUserFromToken } from "../user/user.interface"

@Injectable()
export class GetUser implements NestMiddleware {

    constructor(private jwtService: JwtService) {}

    use(req: Request, res: Response, next: NextFunction) {

        const authHeader = req.headers.authorization
        if (!authHeader) {
            next()
            return
        }


        const token = authHeader.split(" ")[1]
        
        if (!token) {
            next()
            return
        }

        try {
            const user = this.jwtService.verifyJwt({token})
            console.log(user)
            req.user = user as IUserFromToken
        } catch(e) {
            console.log(`Срок jwt токена истёк`)
        }

        // res.

        next()
    }
    
}