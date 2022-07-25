import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { passwordMongoDB } from "./constants"
import { UserModule } from "./user/user.module"
import { AuthModule } from "./auth/auth.model"
import { GetUser } from "./middlewares/getUser.middleware"
import { JwtModule } from "./jwt/jwt.module"
import { TransformInterceptor } from "./interceptors/transform.interceptor"

@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb+srv://verba:${passwordMongoDB}@cluster0.chahgzf.mongodb.net/?retryWrites=true&w=majority`,
    ),
    UserModule,
    AuthModule,
    JwtModule
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(GetUser).forRoutes("*")
  }
}