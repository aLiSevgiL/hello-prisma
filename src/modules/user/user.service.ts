import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/core/prisma.service';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async getUsers() {
    

    const users = await  this.prismaService.user.findMany({});

    
    const responce ={data:users,
      success:true,
      message:'Kullanicilar basariyla getirildi',
    } ;

    return responce;
  }

  async addUser(input: User) {
    input.Password = await hash(input.Password, 10);
    return this.prismaService.user.create({ data: input });
  }

  // hata 1. equals ile arama yapamazsın o full text search için geçerli
  // eğer bir string varsa bunu number'a çevirmek istersek birden fazla yol var en prtaiği başına + işareti koymak :D
  // kaçtım :D bişi olursa wpden yaz abi

  async deleteUser(userId: number) {
    return await this.prismaService.user.delete({ where: { Id: userId } });
  }

  async UpdateUser(userId: string, updateData: Prisma.UserUpdateInput) {
    return this.prismaService.user.update({
      where: { Id: parseInt(userId) },
      data: updateData,
    });
  }

   findOneByUserMail(email: string) {
   return  this.prismaService.user.findFirst({
      where: {
        Email: email,
      },
    });

 
  }
}
