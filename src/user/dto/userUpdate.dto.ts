import { User } from "../user.schema"
import { IsString, MinLength, MaxLength, IsOptional, IsNotEmpty } from 'class-validator';
import { messageForString, messageForMinLength, messageForMaxLength, messageForNotEmpty } from "../../constants/messagesForValidation"

type IUserForUpdate = Partial<Omit<User, "_id">>

export class UserUpdateDto implements IUserForUpdate {
    @IsOptional()
    @IsString({
        message: messageForString
    })
    @MinLength(3, {
        message: messageForMinLength
    })
    name?: string
    @IsOptional()
    @IsString({
        message: messageForString
    })
    @MinLength(3, {
        message: messageForMinLength
    })
    @MaxLength(15, {
        message: messageForMaxLength
    })
    password?: string
    @IsOptional()
    @IsString({
        message: messageForString
    })
    @IsNotEmpty({
        message: messageForNotEmpty
    })
    country?: string
}

