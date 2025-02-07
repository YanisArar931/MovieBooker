import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { MoviesModule } from './movies/movies.module';
import * as dotenv from 'dotenv';
import { MoviesController } from './movies/movies.controller';
import { MoviesService } from './movies/movies.service';
import { ReservationModule } from './reservation/reservation.module';

dotenv.config();

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot("mongodb+srv://yanissarar:JBybMPEy9goLA0Et@moviiebookerdb.c7g4l.mongodb.net/?retryWrites=true&w=majority&appName=MoviieBookerDb"),
    UserModule, 
    JwtModule.register({
      secret: (process.env.JWT_SECRET),
      signOptions: { expiresIn: '1h' },
    }), MoviesModule, ReservationModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}