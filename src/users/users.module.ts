import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PetsController } from 'src/pets/pets.controller';
import { UsersController } from './users.controller';
import { PetsModule } from 'src/pets/pets.module';
import { UsersService } from './users.service';
import { Users } from './entity/users.entity';
import { Pets } from 'src/pets/entity/pets.entity';

@Module({
  imports: [PetsModule, TypeOrmModule.forFeature([Users, Pets])],
  providers: [UsersService],
  controllers: [UsersController, PetsController],
  exports: [UsersModule],
})
export class UsersModule {}
