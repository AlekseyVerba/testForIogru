import { IsString, MinLength, MaxLength, IsNotEmpty } from 'class-validator';
import { messageForString, messageForMinLength, messageForMaxLength, messageForNotEmpty } from "../../constants/messagesForValidation"

export class RegistrationDto {
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
    @IsString({
        message: messageForString
    })
    @IsNotEmpty({
        message: messageForNotEmpty
    })
    country: string
}