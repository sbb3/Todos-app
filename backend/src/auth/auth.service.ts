import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient } from '@prisma/client';
import { Response } from 'express';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Injectable()
export class AuthService extends PrismaClient {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {
    super();
  }

  async validateUser(email: string, password: string): Promise<any> {
    return await this.userService.validateUser(email, password);
  }

  async login(user: any, res: Response) {
    const payload = { email: user.email };
    const { accessToken } = await this.generateTokensAndSetRefreshCookie(
      payload,
      res,
    );

    return {
      accessToken,
      user,
    };
  }

  async register(userData: CreateUserDto, res: Response) {
    if (!userData.email || !userData.password) {
      throw new HttpException(
        'Email and password are required',
        HttpStatus.BAD_REQUEST,
      );
    }
    const user = await this.userService.createUser(userData);
    const payload = { email: user.email };
    const { accessToken } = await this.generateTokensAndSetRefreshCookie(
      payload,
      res,
    );
    return {
      accessToken,
      user,
    };
  }

  async getNewAccessToken(req: any) {
    const refreshToken = req.cookies['refreshToken'];

    if (!refreshToken)
      throw new HttpException(
        'Invalid Authentication',
        HttpStatus.UNAUTHORIZED,
      );
    const payload = await this.validateRefreshToken(refreshToken);
    const user = await this.user.findUnique({
      where: { email: payload.email },
      select: { email: true, name: true, id: true },
    });
    if (!user)
      throw new HttpException(
        'Authentication required',
        HttpStatus.UNAUTHORIZED,
      );
    return {
      accessToken: await this.generateAccessToken(payload),
      user,
    };
  }

  logout(res: Response) {
    if (!res.clearCookie) {
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    res.clearCookie('refreshToken');
    return {
      message: 'logout success',
    };
  }

  private async validateRefreshToken(refreshToken: string) {
    try {
      const payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: process.env.REFRESH_TOKEN_SECRET,
      });
      return { email: payload?.email };
    } catch (e) {
      throw new HttpException('Invalid Refresh Token', HttpStatus.UNAUTHORIZED);
    }
  }

  private async generateTokensAndSetRefreshCookie(
    payload: { email: string },
    res: Response,
  ) {
    const refreshToken = await this.generateRefreshToken(payload);
    const accessToken = await this.generateAccessToken(payload);
    res.cookie('refreshToken', refreshToken, {
      maxAge: 24 * 15 * 60 * 60 * 1000, // 15 days
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });
    return { accessToken };
  }

  private async generateAccessToken(payload: { email: string }) {
    return await this.jwtService.signAsync(payload, {
      secret: process.env.ACCESS_TOKEN_SECRET,
      expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
    });
  }

  private async generateRefreshToken(payload: { email: string }) {
    return await this.jwtService.signAsync(payload, {
      secret: process.env.REFRESH_TOKEN_SECRET,
      expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
    });
  }
}
