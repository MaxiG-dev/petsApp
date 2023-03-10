import {
  Controller,
  UseFilters,
  ParseUUIDPipe,
  Param,
  Body,
  Get,
  Post,
  Patch,
  Delete,
} from '@nestjs/common';
import { PetsDto } from './dtos/pets.dto';
import { PetsService } from './pets.service';
import { ResponseDTO } from 'src/common/dtos/response.dto';
import { RequestFilter } from 'src/common/filters/request.filter';

@Controller('pets')
@UseFilters(new RequestFilter())
export class PetsController {
  constructor(private readonly petsService: PetsService) {}

  @Get()
  async getPets(): Promise<ResponseDTO<any>> {
    return await this.petsService.findAll();
  }

  @Get(':id')
  getPet(@Param('id', ParseUUIDPipe) id: string): Promise<ResponseDTO<any>> {
    return this.petsService.findOne(id);
  }

  @Post()
  createPet(@Body() petsDto: PetsDto): Promise<ResponseDTO<any>> {
    return this.petsService.create(petsDto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() petsDto: PetsDto,
  ): Promise<ResponseDTO<any>> {
    return this.petsService.update(id, petsDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.petsService.remove(id);
  }
}
