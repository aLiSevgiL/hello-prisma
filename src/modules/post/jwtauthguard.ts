import { Injectable, CanActivate, ExecutionContext, UnauthorizedException,Request } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext) {
        
    try {


    const request = context.switchToHttp().getRequest();

    const authHeader = request.headers.authorization;

    console.log('JWTYE GELDİ',authHeader)

    if (!authHeader || !authHeader.startsWith('Bearer')) {
      throw new UnauthorizedException('Unauthorized');
    }

    // Berer token
    // 0      1
   // const token = authHeader.split(' ')[1];
   const parts = authHeader.split(' ');
if (parts.length !== 3 || parts[0] !== 'Bearer' || parts[1] !== 'Bearer') {
  throw new UnauthorizedException('Unauthorized');
}
const token = parts[2];
      const decoded = await this.jwtService.verifyAsync(token);
      console.log(decoded)
      request.user = decoded;
      return true;
    } catch (err) {
      console.log(err)
      throw new UnauthorizedException('Unauthorized');
    }
  }
}