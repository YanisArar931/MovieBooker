import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type ReservationDocument = Reservation & Document;

@Schema()
export class Reservation {
  @ApiProperty({ description: "Titre du film" })
  @Prop({ required: true })
  movieTitle: string;

  @ApiProperty({ description: "Heure de début de la projection" })
  @Prop({ required: true })
  startTime: Date;

}

export const ReservationSchema = SchemaFactory.createForClass(Reservation);
