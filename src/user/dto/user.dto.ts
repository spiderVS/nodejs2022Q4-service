import { Exclude } from 'class-transformer';
import { IsInt, IsString, IsUUID } from 'class-validator';
import { User } from '../interfaces/user.interface';

export class UserDTO implements User {
  @IsUUID()
  readonly id: string;

  @IsString()
  readonly login: string;

  @IsString()
  @Exclude()
  password: string;

  @IsInt()
  version: number;

  @IsInt()
  readonly createdAt: number;

  @IsInt()
  readonly updatedAt: number;

  constructor(partial: Partial<UserDTO>) {
    Object.assign(this, partial);
  }
}
