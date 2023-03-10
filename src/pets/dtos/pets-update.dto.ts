import { PartialType } from '@nestjs/mapped-types';
import { PetsDto } from './pets.dto';

export class PetsUpdateDto extends PartialType(PetsDto) {}
