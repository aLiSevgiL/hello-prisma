import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Param,
  NotFoundException,
  UnauthorizedException,
  UseGuards,
  Request,
  Query,
Headers,
Req,
ParseIntPipe
} from '@nestjs/common';
import { PostService } from './post.service';
import {  Post as  PostItem} from '@prisma/client';
import { JwtAuthGuard } from './jwtauthguard';

@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}





@UseGuards(JwtAuthGuard)
@Get('filtrele')
async getPostFilter(@Query() filter: FiltrelemeParametreleri,@Req() req) {
  
  console.log("Buradayimm : ",req.user);
  const userId=req.user.userId;
  return this.postService.getPostsByFilters({ ...filter,userId,});
}


@Get('getPostsByUserId/:userId')
async getPostsByUserId(@Param('userId', ParseIntPipe) userId:number) {
  return this.postService.getPostsByUserId(userId);
}





@UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() input: PostItem,@Req() req) {
    console.log("İnput daki id " +input.id);
    const userId=req.user.userId;
    input.user_id=userId;
    return this.postService.addPost(input);
  }

@UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deletePost(@Param('id') Id: number,@Req() req) {
    const userId=req.user.userId;
    const deletedPost = await this.postService.deletePost(Number(Id),userId);  
    if (!deletedPost) {
      throw new NotFoundException(
        `Kullanici ID'si ${Id} olan Post bulunamadi.`,
      );
    }
    return deletedPost;
  }


@UseGuards(JwtAuthGuard)
  @Put(':id')
  async updatePost(
    // typescriptte ki tipler bir intent(niyettir) o tipin öyle olduğunu garanti etmez bu yüzden yeniden convert ettik.
     // 2. bir yöntem olarak nestjs verdği bir pipe kullanabiliriz
     // pipe ekledikten sonra number geldi fakat pipe kaldırdığımızda burası string olarak gözükecek deneyelim.
     // hata zaten aşağıda yazıyordu : Argument `id`: Invalid value provided. Expected Int, provided String

    @Param('id') id: number,
    @Body() updateData: PostItem,
  ) {
console.log("number view",5)
console.log("string view "+ 5)

    return this.postService.updatePost(id, updateData);
  }



}
