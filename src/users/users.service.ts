import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { DataBaseException } from 'src/common/filters/database.exception';
import { Users } from './entity/users.entity';
import { UserDto } from './dtos/user.dto';
import { UserUpdateDto } from './dtos/user-update.dto';
import { ResponseDTO } from 'src/common/dtos/response.dto';
import { PetsService } from 'src/pets/pets.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
    private readonly petsService: PetsService,
  ) {}

  async findAll() {
    const users = await this.usersRepository.find();
    if (!users) {
      throw new DataBaseException(`Users not founded`, 404);
    }
    const response: ResponseDTO<any> = plainToInstance(ResponseDTO, { users });
    return response;
  }

  async findOne(id: string) {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new DataBaseException(`User whit id ${id} not founded`, 404);
    }
    const response: ResponseDTO<any> = plainToInstance(ResponseDTO, { user });
    return response;
  }

  async create(usersDto: UserDto) {
    const { petsId = [], pets = [], ...userDetails } = usersDto;
    await this.petsService.validatePetsExistsFromArray(petsId);
    const user = await this.usersRepository.save(instanceToPlain(userDetails));
    await this.petsService.createPetsFromArray(pets, user.id);
    const response: ResponseDTO<any> = plainToInstance(ResponseDTO, { user });
    return response;
  }

  async update(id: string, usersDto: UserUpdateDto) {
    const { petsId = [], pets = [], ...userDetails } = usersDto;
    await this.findOne(id);
    await this.petsService.validatePetsExistsFromArray(petsId);
    await this.petsService.asignPetsFromArrayToUser(petsId, id);
    await this.petsService.createPetsFromArray(pets, id);
    const user = await this.usersRepository.update(
      { id },
      instanceToPlain(userDetails),
    );
    if (!user.affected) {
      throw new DataBaseException(`User whit id ${id} cannot be updated`, 422);
    }
    const response: ResponseDTO<any> = plainToInstance(ResponseDTO, {
      user: userDetails,
    });
    return response;
  }

  async remove(id: string) {
    const { data } = await this.findOne(id);
    const pets = await this.petsService.findOrphanPets(id);
    await this.usersRepository.delete({ id });
    let response: ResponseDTO<any> = data;
    if (pets.length) {
      response = {
        message: `Remember to delete this user's pets, now these pets are orphans.`,
        data: { user: response, petsToDelete: pets.map((pet) => pet.id) },
      };
    }
    return response;
  }
}
