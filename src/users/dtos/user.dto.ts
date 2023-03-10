import { Type } from 'class-transformer';
import {
  IsArray,
  IsEmail,
  IsOptional,
  IsString,
  IsStrongPassword,
  IsUUID,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { PetsDto } from 'src/pets/dtos/pets.dto';

export class UserDto {
  @IsOptional()
  @IsUUID()
  id: string;

  @IsString()
  @MinLength(3)
  name: string;

  @IsString()
  @MinLength(3)
  lastname: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @IsStrongPassword()
  @IsOptional()
  password: string;

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => PetsDto)
  pets?: PetsDto[];

  @IsArray()
  @IsUUID('all', { each: true })
  @IsOptional()
  petsId?: string[];
}
