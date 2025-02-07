import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Reservation, ReservationDocument } from './reservation.schema';
import { CreateReservationDto } from './dto/create-reservation.dto';

@Injectable()
export class ReservationService {
  constructor(@InjectModel(Reservation.name) private reservationModel: Model<ReservationDocument>) {}

  private readonly MOVIE_DURATION = 2 * 60 * 60 * 1000;

  async createReservation(createReservationDto: CreateReservationDto): Promise<ReservationDocument> {
    const { movieTitle, startTime } = createReservationDto;

    const start = new Date(startTime);
    const end = new Date(start.getTime() + this.MOVIE_DURATION);

    const conflict = await this.reservationModel.findOne({
      $or: [
        { startTime: { $lt: end }, endTime: { $gt: start } }
      ]
    });

    if (conflict) {
      throw new ConflictException('Vous avez déjà une réservation à cette heure.');
    }

    const reservation = new this.reservationModel({
      movieTitle,
      startTime: start,
      endTime: end
    });

    return reservation.save();
  }

  async getReservations(userId: string): Promise<ReservationDocument[]> {
    return this.reservationModel.find({ userId }).exec();
  }

  async cancelReservation(reservationId: string, userId: string): Promise<{ message: string }> {
    const reservation = await this.reservationModel.findOne({ _id: reservationId, userId }).exec();

    if (!reservation) {
      throw new NotFoundException("Réservation introuvable.");
    }

    await this.reservationModel.deleteOne({ _id: reservationId }).exec();
    return { message: "Réservation annulée avec succès." };
  }
}
