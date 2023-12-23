import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Request,
  Response,
  Res,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local.guard';
import { JwtAuthGuard } from './guards/jwt.guard';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  @ApiOperation({ summary: 'Login' })
  login(@Request() req, @Response({ passthrough: true }) res) {
    return this.authService.login(req.user, res);
  }

  @Post('register')
  @ApiOperation({ summary: 'Register' })
  @ApiBody({ type: CreateUserDto })
  register(@Body() userData: CreateUserDto, @Res({ passthrough: true }) res) {
    return this.authService.register(userData, res);
  }

  @Get('refresh')
  @ApiOperation({ summary: 'Refresh' })
  refresh(@Req() req) {
    return this.authService.getNewAccessToken(req);
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Logout' })
  logout(@Res({ passthrough: true }) res) {
    return this.authService.logout(res);
  }
}
