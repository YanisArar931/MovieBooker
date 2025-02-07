import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class ReservationDto {
  @ApiProperty({ description: '' })
  @Expose()
  _id: string;

  @ApiProperty({ description: "" })
  @Expose()
  userId: string;

  @ApiProperty({ description: 'ID du film' })
  @Expose()
  movieId: number;

  @ApiProperty({ description: 'Titre du film' })
  @Expose()
  movieTitle: string;

  @ApiProperty({ description: 'Heure de début' })
  @Expose()
  startTime: Date;

  @ApiProperty({ description: 'Heure de fin' })
  @Expose()
  endTime: Date;
}
