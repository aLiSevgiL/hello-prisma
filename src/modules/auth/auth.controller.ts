import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserLoginDto } from './dto/dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get()
  get() {
    return 'AUTH SERVİSİ';
  }

  @Post()
  login(@Body() login: UserLoginDto) {
    return this.authService.Login(login);
  }
}
