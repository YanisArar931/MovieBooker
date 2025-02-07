    import { Controller, Post, Body, UseGuards, Get, Request, HttpException, HttpStatus } from '@nestjs/common';
    import { UserService } from './user.service';
    import { RegisterDto } from './dto/register.dto';
    import { LoginDto } from './dto/login.dto';
    import { ApiTags } from '@nestjs/swagger';
    // import { JwtAuthGuard } from './jwt-auth.guard';

    @ApiTags('Authentification')
    @Controller('auth')
    export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('register')
    // @UseGuards(JwtAuthGuard)
    async register(@Body() registerDto: RegisterDto) {
      try {
        return await this.userService.register(registerDto.username, registerDto.email, registerDto.password);
      } catch (error) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
    }

    @Post('login')
    // @UseGuards(JwtAuthGuard)
    async login(@Body() loginDto: LoginDto) {
      try {
        return await this.userService.login(loginDto.email, loginDto.password);
      } catch (error) {
        throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
      }
    }
    }