import {
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  Res,
  Redirect,
  HttpCode,
  BadRequestException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { GoogleAuthGuard } from './guards/google-auth.guard';
import type { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // Redirect to google signin service (external)
  @Get('google')
  @UseGuards(GoogleAuthGuard)
  async googleAuth(@Request() req, @Res() res) {
    // Initiates the Google OAuth process
  }

  // Google redirects here after signin
  @Get('google/callback')
  @Redirect('/user/whoami', 302)
  @UseGuards(GoogleAuthGuard)
  async googleAuthRedirect(@Request() req: Request, @Res() res: Response) {
    if (!req) {
      throw new BadRequestException('No request object found');
    }
    const { accessToken } = await this.authService.googleLogin(req);
    // Inject the JWT token into a cookie
    res.cookie('access_token', accessToken, {
      httpOnly: true,
    });
  }

  // logout
  @Get('logout')
  @HttpCode(200)
  async logout(@Res() res: Response) {
    // Clear the cookie
    res.clearCookie('access_token', {
      httpOnly: true,
    });
    return res.json({ message: 'Successfully logged out' });
  }
}
