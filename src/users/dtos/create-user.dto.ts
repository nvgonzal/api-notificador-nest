import { IsString, IsNotEmpty, IsEmail, IsDateString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  lastName: string;
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsDateString()
  bday: Date;
  @IsString()
  @IsNotEmpty()
  password: string;
}
