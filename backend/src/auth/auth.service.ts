import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
// ...existing code...
import { User, Prisma } from 'generated/prisma';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  // เพิ่ม google Login เข้ามา
  async googleLogin(req: any): Promise<any> {
    if (!req.user) {
      throw new BadRequestException('Google login failed: No user.');
    }

    const {
      usr_email,
      usr_firstname,
      usr_lastname,
      usr_avatar,
      usr_google_id,
    } = req.user;
    let user = await this.userService.user({ usr_email });

    if (!user) {
      user = await this.userService.createUser({
        usr_email,
        usr_firstname,
        usr_lastname,
        usr_google_id,
        usr_avatar,
        usr_phone: '',
      });
    }

    // Include user id in the JWT payload as `sub` so downstream guards can identify the user
    const payload = { sub: user.usr_id, email: user.usr_email };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
