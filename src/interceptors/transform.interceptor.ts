import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Request } from "express"
import { JwtService } from "../jwt/jwt.service"

export interface Response<T> {
  data: T;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {

    constructor(
        private jwtService: JwtService
    ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {

    const request: Request = context.switchToHttp().getRequest();

    const adictionalProperty: any = {}

    if (request.user) {
        adictionalProperty.token = this.jwtService.createJWT({
            payload: {
                _id: request.user._id,
                name: request.user.name
            }
        })
    }

    return next.handle().pipe(map(data => ({ ...data, ...adictionalProperty })));
  }
}