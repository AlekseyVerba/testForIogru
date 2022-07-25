import { Controller, Post, Body, Get, UseGuards } from "@nestjs/common"
import { AuthService } from "./auth.service"
import { IResponseSuccess } from "../types/response/index.interface"
import { RegistrationDto } from "./dto/registration.dto"
import { LoginDto } from "./dto/login.dto"
import { ValidationPipe } from "../pipes/validation.pipe"
import { User } from "../user/user.schema"
import { IUserWithToken } from "../user/user.interface"
import { AuthGuard } from "../guards/auth.guard"
import { UserProperty } from "../decorators/userProperty.decorator"


@Controller("auth")
export class AuthController {

    constructor(
        private authService: AuthService
    ) {}

    @Post("registration")
    async registration(
        @Body(new ValidationPipe()) registrationDto: RegistrationDto
    ): Promise<IResponseSuccess<void>> {

        await this.authService.registration(registrationDto)

        return {
            status: true,
            message: "Успешно"
        }
    }

    @Post("login")
    async login(
        @Body(new ValidationPipe()) loginDto: LoginDto
    ): Promise<IResponseSuccess<IUserWithToken>> {

        const user = await this.authService.login(loginDto)

        return {
            status: true,
            message: "Успешно",
            data: user
        }
    }

    @Get("check")
    @UseGuards(AuthGuard)
    async check(
        @UserProperty("_id") userID: string,
    ): Promise<IResponseSuccess<IUserWithToken>> {
        const userWithToken = await this.authService.check(userID)

        return {
            status: true,
            message: "Успешно",
            data: userWithToken
        }
    }

}