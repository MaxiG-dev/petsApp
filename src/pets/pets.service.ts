import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { ResponseDTO } from 'src/common/dtos/response.dto';
import { DataBaseException } from 'src/common/filters/database.exception';
import { In, Repository } from 'typeorm';
import { PetsUpdateDto } from './dtos/pets-update.dto';
import { PetsDto } from './dtos/pets.dto';
import { Pets } from './entity/pets.entity';

@Injectable()
export class PetsService {
  constructor(
    @InjectRepository(Pets)
    private readonly petsRepository: Repository<Pets>,
  ) {}

  async findAll() {
    const pets = await this.petsRepository.find();
    if (!pets) {
      throw new DataBaseException(`Pets not founded`, 404);
    }
    const response: ResponseDTO<any> = plainToInstance(ResponseDTO, { pets });
    return response;
  }

  async findOne(id: string) {
    const pet = await this.petsRepository.findOneBy({ id });
    if (!pet) {
      throw new DataBaseException(`Pet whit id ${id} not founded`, 404);
    }
    const response: ResponseDTO<any> = plainToInstance(ResponseDTO, { pet });
    return response;
  }

  async create(petsDto: PetsDto) {
    const pet = await this.petsRepository.save(instanceToPlain(petsDto));
    if (!pet) {
      throw new DataBaseException(`Pet cannot be created`, 422);
    }
    const response: ResponseDTO<any> = plainToInstance(ResponseDTO, { pet });
    if (!pet.user) {
      response.message =
        'Pet created but not assigned to user, be careful, the pet will be orphan';
    }
    return response;
  }

  async update(id: string, petsDto: PetsUpdateDto) {
    const pet = await this.petsRepository.update(
      { id },
      instanceToPlain(petsDto),
    );
    if (!pet.affected) {
      throw new DataBaseException(`Pet whit id ${id} cannot be updated`, 422);
    }
    const response: ResponseDTO<any> = plainToInstance(ResponseDTO, {
      pet: petsDto,
    });
    return response;
  }

  async remove(id: string) {
    const pet = await this.petsRepository.delete({ id });
    if (!pet.affected) {
      throw new DataBaseException(`Pet whit id ${id} not founded`, 404);
    }
  }

  async validatePetsExistsFromArray(petsId: string[]) {
    const result = await this.petsRepository.findBy({ id: In(petsId) });
    if (petsId.length !== result.length) {
      throw new DataBaseException(`One or more pets id are not valid`, 400);
    }
  }

  async createPetsFromArray(pets: PetsDto[], userId: string) {
    const petsList = pets.map((pet) => {
      pet.user = userId;
      return pet;
    });
    await this.petsRepository.save(instanceToPlain(petsList));
  }

  async asignPetsFromArrayToUser(petsId: string[], userId: string) {
    await this.petsRepository.update({ id: In(petsId) }, { user: userId });
  }

  async findOrphanPets(userId: string) {
    const pets = await this.petsRepository.find({
      select: ['id'],
      where: { user: userId },
    });
    return pets;
  }
}
