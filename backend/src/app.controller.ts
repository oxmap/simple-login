import { Controller, Post, Get, Body, UseInterceptors } from '@nestjs/common';
import { LoginRequest, User } from 'shared';
import { UserService } from 'services/user.service';
import { LoginInterceptor, GetUserAuthenticatedInterceptor } from 'middlewares/login.middleware';
import { ReqUser } from 'decorators/user.decorator';
import { AuthorizeInterceptor } from 'middlewares/authorize.middleware';

@Controller('')
export class AppController {
  constructor(private readonly authService: UserService) {}

  @Post('signin')
  @UseInterceptors(LoginInterceptor)
  async signin(@Body() user: LoginRequest): Promise<{ status: number }> {
      return this.authService.validateUser(user.email, user.password) as any;
  }

  @Post('signup')
  @UseInterceptors(AuthorizeInterceptor)
  async signup(@ReqUser() user: User): Promise<{ status: number }> {
      return this.authService.logout(user) as any;
  }

  @UseInterceptors(GetUserAuthenticatedInterceptor)
  @Get('getUserAuthenticated')
  async getUserAuthenticated(@ReqUser() user: User): Promise<User> {
      return user;
  }
}
