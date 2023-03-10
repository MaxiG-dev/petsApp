import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseFilters,
} from '@nestjs/common';
import { ResponseDTO } from 'src/common/dtos/response.dto';
import { RequestFilter } from 'src/common/filters/request.filter';
import { PostUpdateDto } from './dtos/post-update.dto';
import { PostDto } from './dtos/post.dto';
import { PostsService } from './posts.service';

@Controller('posts')
@UseFilters(new RequestFilter())
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  getPosts(): Promise<ResponseDTO<any>> {
    return this.postsService.findAll();
  }

  @Get(':id')
  getPost(@Param('id', ParseUUIDPipe) id: string): Promise<ResponseDTO<any>> {
    return this.postsService.findOne(id);
  }

  @Post()
  createPost(@Body() postsDto: PostDto): Promise<ResponseDTO<any>> {
    return this.postsService.create(postsDto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() postDto: PostUpdateDto,
  ): Promise<ResponseDTO<any>> {
    return this.postsService.update(id, postDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.postsService.remove(id);
  }
}
