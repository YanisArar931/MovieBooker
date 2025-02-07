import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @IsEmail()
  @ApiProperty({description: "C'est l'email de l'utilisateur", example: "yanis@gmail.com"})
  email: string;

  @IsNotEmpty()
  @ApiProperty({description: "C'est le mdp de l'utilisateur", example: "motdepasse"})
  password: string;
}
