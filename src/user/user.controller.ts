import { Controller, Query, Get, Delete, Param, Put, Body, UseInterceptors } from "@nestjs/common"
import { UserService } from "./user.service"
import { IUserArr } from "./user.interface"
import { IResponseSuccess } from "../types/response/index.interface"
import { UserUpdateDto } from "./dto/userUpdate.dto"
import { ValidationPipe } from "../pipes/validation.pipe"

@Controller("user")
export class UserController {

    constructor(
        private userService: UserService
    ) {}

    @Get()
    async getAll(
        @Query("offset") offset: number | undefined,
        @Query("limit") limit: number | undefined
    ): Promise<IResponseSuccess<IUserArr>>{
        const result = await this.userService.getAll(offset, limit)
        return {
            status: true,
            message: "Успешно",
            data: result
        }
    }

    @Delete(":id")
    async deleteUser(
        @Param("id") userID: string
    ): Promise<IResponseSuccess<void>> {
        await this.userService.deleteUserByID(userID)
        return {    
            status: true,
            message: `Пользователь с id - ${userID} удален`
        }
    }

    @Put(":id")
    async updateUser(
        @Param("id") userID: string,
        @Body(new ValidationPipe()) userUpdate: UserUpdateDto
    ): Promise<IResponseSuccess<void>> {
        await this.userService.updateUserByID(userID, userUpdate)
        return {
            status: true,
            message: `Пользователь с id - ${userID} обновлен`,
        }
    }



}