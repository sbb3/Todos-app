import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from './auth/guards/jwt.guard';

@ApiTags('Todos app')
@Controller()
export class AppController {
  constructor() {}

  @Get()
  @UseGuards(JwtAuthGuard)
  getApi(): string {
    return 'This is the backend for the Todo App';
  }
}
