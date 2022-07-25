import { User } from "./user.schema"


export type ICreateUser = Pick<User, "name" | "password" | "country">

export type IUserWithToken = {
    user: User
    token: string
}

export interface IUserFromToken {
    _id: string
    name: string
}

export interface IUserArr {
    items: User[]
    count: number
}