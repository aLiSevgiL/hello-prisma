import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserLoginDto } from './dto/dto';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcryptjs from 'bcryptjs';
import { JwtPayload } from './auth.types';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async Login(login: UserLoginDto) {
    const user = await this.userService.findOneByUserMail(login.email);
    if (!user) throw new UnauthorizedException('Invalid email');

    // methodlar-değişkenler-parametler(argumanlar) camelCase
    //PI dosyanın başında tanımı yapılır            UPPER_SNAKE_CASE

    // PASCAL CASE PascalCase
    const isPasswordInvalid = await bcryptjs.compare(
     login.password,
      user.Password,
    );
      console.log(isPasswordInvalid);
    if (!isPasswordInvalid) throw new UnauthorizedException('Invalid password');
    // BadRequest http status 400
    //401 Unauthrozed

    user.Password = '';

    const jwtData = {
      auth: user,
      type: 'user',
      userId: user.Id,
    };

    const token = await this.jwtService.signAsync(jwtData);

    console.log(token);

    return { token };
  }
}
