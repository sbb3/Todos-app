import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService extends PrismaClient {
  constructor() {
    super();
  }

  async createUser(createUserDto: CreateUserDto) {
    try {
      const user = await this.user.findUnique({
        where: {
          email: createUserDto.email,
        },
      });

      if (user)
        throw new HttpException('User already exists', HttpStatus.FORBIDDEN);

      const hashedPassword = await this.hashPassword(createUserDto.password);
      return await this.user.create({
        data: {
          ...createUserDto,
          password: hashedPassword,
        },
        select: {
          email: true,
          name: true,
          id: true,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async validateUser(email: string, password: string): Promise<any> {
    try {
      const user = await this.user.findUnique({
        where: {
          email,
        },
        select: {
          email: true,
          name: true,
          id: true,
          password: true,
        },
      });
      if (!user)
        throw new HttpException(
          'Invalid Email or Password',
          HttpStatus.UNAUTHORIZED,
        );

      const match = await this.comparePassword(password, user.password);
      if (!match)
        throw new HttpException(
          'Invalid Email or Password',
          HttpStatus.UNAUTHORIZED,
        );
      return {
        email: user.email,
        name: user.name,
        id: user.id,
      };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  private async hashPassword(password: string): Promise<string> {
    try {
      const salt = await bcrypt.genSalt(10);
      return await bcrypt.hash(password, salt);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  private async comparePassword(
    password: string,
    hashedPassowrd: string,
  ): Promise<boolean> {
    try {
      return await bcrypt.compare(password, hashedPassowrd);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
