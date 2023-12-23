import { IsBoolean, IsString } from 'class-validator';

export class CreateTodoDto {
  @IsString()
  id: string;
  @IsString()
  userId: string;
  @IsString()
  title: string;
  @IsBoolean()
  isDone: boolean;
}
