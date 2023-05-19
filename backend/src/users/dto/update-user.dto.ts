import { IsEmail, IsOptional, IsString, Length } from "class-validator";

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @Length(5, 150)
  name: string;

  @IsOptional()
  @IsEmail()
  @Length(5, 150)
  email: string;
}
