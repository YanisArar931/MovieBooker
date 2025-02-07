import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @IsNotEmpty()
  @ApiProperty({description: "C'est le nom de l'utilisateur", example: "Yanis"})
  username: string;

  @IsEmail()
  @ApiProperty({description: "C'est le mail l'utilisateur", example: "yanis@gmail.com"})
  email: string;

  @MinLength(6)
  @ApiProperty({description: "C'est le mdp de l'utilisateur", example: "motdepasse"})
  password: string;
}