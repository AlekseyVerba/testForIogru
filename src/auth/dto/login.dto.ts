import { IsString, MinLength, MaxLength } from 'class-validator';
import { messageForString, messageForMinLength, messageForMaxLength } from "../../constants/messagesForValidation"

export class LoginDto {
    @IsString({
        message: messageForString
    })
    @MinLength(3, {
        message: messageForMinLength
    })
    name: string
    @IsString({
        message: messageForString
    })
    @MinLength(3, {
        message: messageForMinLength
    })
    @MaxLength(15, {
        message: messageForMaxLength
    })
    password: string
}