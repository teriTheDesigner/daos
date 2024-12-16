import { IsEmail, IsNotEmpty, IsString, IsOptional } from "class-validator";

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsOptional()
  city?: string;

  @IsString()
  @IsOptional()
  instrument?: string;
}
