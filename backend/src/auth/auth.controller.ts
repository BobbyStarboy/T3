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
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiExcludeEndpoint,
} from '@nestjs/swagger';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // Redirect to google signin service (external)
  @Get('google')
  @ApiOperation({
    summary: 'Initiate Google OAuth',
    description: 'Redirects user to Google OAuth login page',
  })
  @ApiResponse({
    status: 302,
    description: 'Redirects to Google OAuth authorization URL',
  })
  @UseGuards(GoogleAuthGuard)
  async googleAuth(@Request() req, @Res() res) {
    // Initiates the Google OAuth process
  }

  // Google redirects here after signin
  @Get('google/callback')
  @ApiOperation({
    summary: 'Google OAuth callback',
    description: 'Handles Google OAuth callback and sets authentication cookie',
  })
  @ApiResponse({
    status: 302,
    description: 'Successfully authenticated, redirects to /user/whoami',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - Invalid callback data',
  })
  @ApiExcludeEndpoint()
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
  @ApiOperation({
    summary: 'User logout',
    description: 'Logs out the user by clearing the authentication cookie',
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully logged out',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Successfully logged out',
        },
      },
    },
  })
  @HttpCode(200)
  async logout(@Res() res: Response) {
    // Clear the cookie
    res.clearCookie('access_token', {
      httpOnly: true,
    });
    return res.json({ message: 'Successfully logged out' });
  }
}
