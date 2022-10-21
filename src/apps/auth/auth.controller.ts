import { Controller, HttpCode, Post, Headers, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.serveice';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('users/signup')
  @HttpCode(200)
  async signup(
    @Res() res: Response,
    @Headers('authorization') authorization: string,
  ): Promise<Response> {
    const { accessToken } = await this.authService.signup(authorization);

    return res.set({ authorization: accessToken }).end();
  }
}
