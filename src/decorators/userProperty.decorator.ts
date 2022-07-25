import { createParamDecorator, ExecutionContext } from "@nestjs/common"
import { IUserFromToken } from "../user/user.interface"

export const UserProperty = createParamDecorator(
    (property: keyof IUserFromToken, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        const returnData = request.user[property] ? request.user[property] : undefined
        return returnData
    }
)