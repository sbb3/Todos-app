import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class TodoService extends PrismaClient {
  constructor() {
    super();
  }

  async getAllTodos(userId: string) {
    try {
      return await this.todo.findMany({
        where: { userId },
        orderBy: {
          createdAt: 'desc',
        },
      });
    } catch (error) {
      throw new HttpException(
        'Could not get todos',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getSingleTodo(id: string) {
    try {
      return await this.todo.findUnique({
        where: { id },
      });
    } catch (error) {
      throw new NotFoundException(`Todo with id ${id} not found`);
    }
  }

  async createTodo(data: CreateTodoDto) {
    try {
      return await this.todo.create({
        data,
      });
    } catch (error) {
      throw new HttpException(
        'Could not create todo',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateTodo(id: string, updatingData: UpdateTodoDto) {
    try {
      return await this.todo.update({
        where: { id },
        data: updatingData,
      });
    } catch (error) {
      throw new HttpException(
        'Could not update todo',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async removeTodo(id: string) {
    try {
      return await this.todo.delete({
        where: { id },
      });
    } catch (error) {
      throw new HttpException(
        'Could not remove todo',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
