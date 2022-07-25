import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = Document & User

@Schema()
export class User {
    
    _id: string

    @Prop({
        required: true,
        type: String,
        unique: true
    })
    name: string

    @Prop({
        required: true,
        type: String,
        select: false
    })
    password: string

    @Prop({
        type: String,
        default: ""
    })
    country: string
}

export const UserSchema = SchemaFactory.createForClass(User)