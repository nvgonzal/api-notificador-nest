import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsDateString,
  MinLength,
} from 'class-validator';

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
  @MinLength(8)
  password: string;
}
