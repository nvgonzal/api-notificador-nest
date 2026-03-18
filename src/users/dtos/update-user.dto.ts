import { IsString, IsDate } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  name: string;
  @IsString()
  lastName: string;
  @IsString()
  email: string;
  @IsDate()
  bday: Date;
}
