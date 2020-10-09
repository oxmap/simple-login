import { Injectable, NestInterceptor, ExecutionContext, CallHandler, ForbiddenException } from '@nestjs/common';
import { UserService } from '../services/user.service';

@Injectable()
export class AuthorizeInterceptor implements NestInterceptor {
    constructor(private userService: UserService) {}
    async intercept(context: ExecutionContext, next: CallHandler) {
        const user = await this.userService.getUserAuthenticated(context.getArgs()[0].cookies.t);
        if (!user) {
            throw new ForbiddenException();
        }

        context.getArgs()[0].user = user;
        return next.handle();
    }
}
