import { Module } from '@nestjs/common';
import { PrismaModule } from './core/prisma.module';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { UserModule } from './modules/user/user.module';
import { AutModule } from './modules/auth/auth.module';
import { PostModule } from './modules/post/post.module';

@Module({
  imports: [PrismaModule, UserModule, AutModule,PostModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
