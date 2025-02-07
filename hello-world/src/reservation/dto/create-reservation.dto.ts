import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateReservationDto {
    
  @ApiProperty({ description: 'Titre du film' })
  @IsString()
  @IsNotEmpty()
  movieTitle: string;

  @ApiProperty({ description: 'Heure de début de la réservation' })
  @IsDateString()
  @IsNotEmpty()
  startTime: Date;
}
