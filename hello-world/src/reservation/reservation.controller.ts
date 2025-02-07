import { Controller, Post, Body, Request, UseGuards } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/user/jwt-auth.guard';
import { CreateReservationDto } from './dto/create-reservation.dto';

@ApiTags('Reservations')
@Controller('reservations')
export class ReservationController {
  constructor(private readonly reservationsService: ReservationService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Créer une réservation pour un film' })
  async createReservation(@Request() req, @Body() createReservationDto: CreateReservationDto) {
    const reservation = await this.reservationsService.createReservation({
      ...createReservationDto,
    });
}
}