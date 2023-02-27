import { IsNotEmpty, IsString } from 'class-validator';
import { UpdatePassword } from '../interfaces/update-user-password.interface';

export class UpdatePasswordDTO implements UpdatePassword {
  @IsNotEmpty()
  @IsString()
  oldPassword: string;

  @IsNotEmpty()
  @IsString()
  newPassword: string;
}
