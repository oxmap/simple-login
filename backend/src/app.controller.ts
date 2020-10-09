import { Controller, Post, Get, Body, UseInterceptors, HttpCode, Req } from '@nestjs/common';
import { LoginRequest, SigninRequest, User } from 'models';
import { UserService } from 'services/user.service';
import { ReqUser } from 'decorators/user.decorator';
import { ApiSecurity } from '@nestjs/swagger';
import { userInfo } from 'os';

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
  @ApiSecurity('access-token')
  async getUserAuthenticated(@Req() req): Promise<User> {
      return req.raw.user.toClient();
  }
}
