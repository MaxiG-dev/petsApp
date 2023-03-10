import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { ResponseDTO } from 'src/common/dtos/response.dto';
import { DataBaseException } from 'src/common/filters/database.exception';
import { Repository } from 'typeorm';
import { PostUpdateDto } from './dtos/post-update.dto';
import { PostDto } from './dtos/post.dto';
import { Post } from './entity/post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
  ) {}

  async findAll() {
    const posts = await this.postsRepository.find();
    if (!posts) {
      throw new DataBaseException(`Pets not founded`, 404);
    }
    const response: ResponseDTO<any> = plainToInstance(ResponseDTO, { posts });
    return response;
  }

  async findOne(id: string) {
    const post = await this.postsRepository.findOneBy({ id });
    if (!post) {
      throw new DataBaseException(`Pet whit id ${id} not founded`, 404);
    }
    const response: ResponseDTO<any> = plainToInstance(ResponseDTO, { post });
    return response;
  }

  async create(postDto: PostDto) {
    const post = await this.postsRepository.save(instanceToPlain(postDto));
    if (!post) {
      throw new DataBaseException(`Post cannot be created`, 422);
    }
    const response: ResponseDTO<any> = plainToInstance(ResponseDTO, { post });
    return response;
  }

  async update(id: string, postDto: PostUpdateDto) {
    const post = await this.postsRepository.update(
      { id },
      instanceToPlain(postDto),
    );
    if (!post.affected) {
      throw new DataBaseException(`Post whit id ${id} cannot be updated`, 422);
    }
    const response: ResponseDTO<any> = plainToInstance(ResponseDTO, {
      post: postDto,
    });
    return response;
  }

  async remove(id: string) {
    const post = await this.postsRepository.delete({ id });
    if (!post.affected) {
      throw new DataBaseException(`Post whit id ${id} not founded`, 404);
    }
  }
}
