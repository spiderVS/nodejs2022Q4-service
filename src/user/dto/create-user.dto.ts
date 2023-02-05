import { IsNotEmpty, IsString } from 'class-validator';
import { CreateUser } from '../interfaces/create-user.interface';

export class CreateUserDTO implements CreateUser {
  @IsNotEmpty()
  @IsString()
  readonly login: string;

  @IsNotEmpty()
  @IsString()
  readonly password: string;
}
