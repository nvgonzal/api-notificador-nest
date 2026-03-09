import { IsString, IsNotEmpty, IsDate } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  lastName: string;
  @IsString()
  @IsNotEmpty()
  email: string;
  @IsDate()
  bday: Date;
}
