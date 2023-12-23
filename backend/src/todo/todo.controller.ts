import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('todos')
@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get all todos' })
  @ApiQuery({ name: 'userId', type: String })
  getAllTodos(@Query('userId') userId: string) {
    return this.todoService.getAllTodos(userId);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get single todo' })
  @ApiParam({ name: 'id', type: String })
  getSingleTodo(@Param('id') id: string) {
    return this.todoService.getSingleTodo(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create todo' })
  @ApiBody({ type: CreateTodoDto })
  createTodo(@Body() createTodoDto: CreateTodoDto) {
    return this.todoService.createTodo(createTodoDto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update todo' })
  @ApiParam({ name: 'id', type: String })
  updateTodo(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todoService.updateTodo(id, updateTodoDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Remove todo' })
  @ApiParam({ name: 'id', type: String })
  removeTodo(@Param('id') id: string) {
    return this.todoService.removeTodo(id);
  }
}
