import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PetsController } from './pets.controller';
import { PetsService } from './pets.service';
import { Pets } from './entity/pets.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pets])],
  providers: [PetsService],
  controllers: [PetsController],
  exports: [PetsModule, PetsService],
})
export class PetsModule {}
