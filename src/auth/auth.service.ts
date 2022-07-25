import { Injectable, BadRequestException, NotFoundException } from "@nestjs/common"
import { UserService } from "../user/user.service"
import { User } from "../user/user.schema"
import { IUserWithToken } from "../user/user.interface"
import { RegistrationDto } from "./dto/registration.dto"
import { LoginDto } from "./dto/login.dto"
import { IResponseFail } from "../types/response/index.interface"
import { compare } from "bcryptjs"
import { JwtService } from "../jwt/jwt.service"

@Injectable()
export class AuthService {

    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) {}

    async registration(registrationDto: RegistrationDto): Promise<User> {
        const user = await this.userService.createUser(registrationDto)
        return user
    }

    async login({name, password}: LoginDto): Promise<IUserWithToken> {
        const candidate = await this.userService.findUserByEmailWithPassword(name)

        if (!candidate) {
            const objError: IResponseFail = {
                status: false,
                message: "Неверные данные"
            }

            throw new BadRequestException(objError)
        }

        const isEqualPasswords = await compare(password, candidate.password)

        candidate.password = null

        if (!isEqualPasswords) {
            const objError: IResponseFail = {
                status: false,
                message: "Неверные данные"
            }

            throw new BadRequestException(objError)
        }

        const token = this.jwtService.createJWT({
            payload: {
                _id: candidate._id,
                name: candidate.name
            }
        })

        return {
            user: candidate,
            token
        }

    }

    async check(userID: string): Promise<IUserWithToken> {
        const candidate = await this.userService.findUserByID(userID)

        if (!candidate) {
            const objError: IResponseFail = {
                status: false,
                message: "Пользователь с данным id не найден"
            }

            throw new NotFoundException(objError)
        }

        const token = this.jwtService.createJWT({
            payload: {
                _id: candidate._id,
                name: candidate.name
            }
        })

        return {
            user: candidate,
            token
        }

    }


}