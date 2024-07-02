import { Body, Injectable, UnauthorizedException } from '@nestjs/common';
import { Post, Prisma } from '@prisma/client';
import { PrismaService } from 'src/core/prisma.service';
import { JwtPayload } from '../auth/auth.types';
import {  Post as  PostItem} from '@prisma/client';
import { title } from 'process';

@Injectable()
export class PostService {
  constructor(private prismaService: PrismaService) {}

  async getPost(jwtPayload: JwtPayload) {
    if (!jwtPayload.id) {
      throw new UnauthorizedException('Invalid token');
    }
    return this.prismaService.post.findMany({
      where: {
        id: jwtPayload.id,
      },
    });
  }

  async addPost(@Body() input: PostItem) {
    console.log("Dataki id : "+input.id);
    return this.prismaService.post.create({ data:input });
  }

  async deletePost(id: number,user_id:number) {
    return await this.prismaService.post.delete({ where: { id,user_id } });
  }

  async updatePost(id: number, updateData: Prisma.PostUpdateInput) {
    console.log("Servisdeki id " + id)
    console.log(updateData);

    return this.prismaService.post.update({
      where: { id:Number(id) },
      data: updateData,
    });
  }


  async getPostsByUserId(userId: number) {
  return this.prismaService.post.findMany({ where: { user_id: userId }});
}

 async getPostsByFilters(filters: FiltrelemeParametreleri & {userId:number}) {
  console.log("servisdeki filitre "+filters);

    return this.prismaService.post.findMany({
      where: {AND:[{user_id:filters.userId},
        {created_at:{gte:filters.baslangicTarihi,lte:filters.bitisTarihi}},
        {body:filters.body},
        {title:filters.title}
      ]}})
      }

}
