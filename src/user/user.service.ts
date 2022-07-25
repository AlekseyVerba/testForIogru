import { Injectable, ConflictException } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { User, UserDocument } from "./user.schema"
import { Model } from "mongoose"
import { ICreateUser } from "./user.interface"
import { IResponseFail } from "../types/response/index.interface"
import { hash } from "bcryptjs"
import { IUserArr } from "./user.interface"
import { UserUpdateDto } from "./dto/userUpdate.dto"

@Injectable()
export class UserService {

    constructor(
        @InjectModel(User.name)
        private userModel: Model<UserDocument>
    ) {}


    async createUser({ name, password, country }: ICreateUser): Promise<User> {
        const candidateUser = await this.userModel.findOne().where({name}).select("id")
        
        if (candidateUser) {
            const objError: IResponseFail = {
                status: false,
                message: "Пользователь с данным email уже существует"
            }

            throw new ConflictException(objError)
        }

        const passwordHash = await hash(password, 8)

        return await this.userModel.create({
            name,
            password: passwordHash,
            country: country
        })

    }     

    async findUserByEmail(name: string): Promise<User>{
        return await this.userModel.findOne().where({name})
    }

    async findUserByEmailWithPassword(name: string): Promise<User>{
        return await this.userModel.findOne().where({name}).select('+password')
    }

    async findUserByID(id: string): Promise<User>{
        const user = await this.userModel.findOne().where({_id:id})
        return user
    }

    async getAll(offset:number = 0, limit: number = 10): Promise<IUserArr> {
        const count = await this.userModel.count()
        const items = await this.userModel.find().skip(offset).limit(limit)
        return {
            count,
            items
        }
    }

    async deleteUserByID(id: string): Promise<any> {
        return await this.userModel.deleteOne({_id: id})
    }

    async updateUserByID(id: string, body: UserUpdateDto): Promise<any> {
        return await this.userModel.findOneAndUpdate({_id: id}, body)
    }

}
