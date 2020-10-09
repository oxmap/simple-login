import { Controller, Post, Get, Body, UseInterceptors, HttpCode } from '@nestjs/common';
import { LoginRequest, SigninRequest, User } from 'models';
import { UserService } from 'services/user.service';
import { LoginInterceptor, GetUserAuthenticatedInterceptor } from 'middlewares/login.middleware';
import { ReqUser } from 'decorators/user.decorator';
import { AuthorizeInterceptor } from 'middlewares/authorize.middleware';

@Controller('')
export class AppController {
  constructor(private readonly authService: UserService) {}

  @Post('signup')
  async signup(@Body() user: SigninRequest): Promise<{ status: number }> {
      return this.authService.addUser(user) as any;
  }

  @Post('signin')
  @HttpCode(200)
  async signin(@Body() user: LoginRequest): Promise<{ status: number }> {
      return this.authService.validateUser(user.email, user.password) as any;
  }

  @Get('me')
  @UseInterceptors(AuthorizeInterceptor)
  async getUserAuthenticated(@ReqUser() user: User): Promise<User> {
      return user;
  }
}
