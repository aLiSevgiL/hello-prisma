import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';


@Module({
  imports: [],
  controllers: [PostController],
  providers: [PostService],
  exports: [PostService],
})
export class PostModule {}
