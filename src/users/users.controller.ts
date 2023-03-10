import {
  Controller,
  UseFilters,
  ParseUUIDPipe,
  ValidationPipe,
  Param,
  Body,
  Get,
  Post,
  Patch,
  Delete,
} from '@nestjs/common';
import { UserDto } from './dtos/user.dto';
import { UsersService } from './users.service';
import { ResponseDTO } from 'src/common/dtos/response.dto';
import { UserUpdateDto } from './dtos/user-update.dto';
import { RequestFilter } from 'src/common/filters/request.filter';

@Controller('users')
@UseFilters(new RequestFilter())
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getUsers(): Promise<ResponseDTO<any>> {
    const users = await this.usersService.findAll();
    return users;
  }

  @Get(':id')
  getUser(@Param('id', ParseUUIDPipe) id: string): Promise<ResponseDTO<any>> {
    return this.usersService.findOne(id);
  }

  @Post()
  async createUser(
    @Body(ValidationPipe) usersDto: UserDto,
  ): Promise<ResponseDTO<any>> {
    return await this.usersService.create(usersDto);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() usersDto: UserUpdateDto,
  ): Promise<ResponseDTO<any>> {
    return await this.usersService.update(id, usersDto);
  }

  @Delete(':id')
  @UseFilters(new RequestFilter())
  async remove(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ResponseDTO<any>> {
    return await this.usersService.remove(id);
  }
}
