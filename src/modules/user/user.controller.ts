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
import { UserService } from './user.service';
import { Prisma, User } from '@prisma/client';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getUsers() {
    return this.userService.getUsers();
  }

  @Post()
  create(@Body() input: User) {
    return this.userService.addUser(input);
  }

  @Delete(':id')
  async deleteUser(@Param('id') userId: string) {
    console.log('Silenecek ID ' + userId);
    const deletedUser = await this.userService.deleteUser(Number(userId));
    console.log(deletedUser);
    if (!deletedUser) {
      throw new NotFoundException(
        `Kullanici ID'si ${userId} olan kullanici bulunamadi.`,
      );
    }
    return deletedUser;
  }

  @Put('/:userId')
  async updateUser(
    @Param('userId') userId: string,
    @Body() updateData: Prisma.UserUpdateInput,
  ) {
    return this.userService.UpdateUser(userId, updateData);
  }



}
