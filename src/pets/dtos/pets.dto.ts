import {
  IsArray,
  IsIn,
  IsOptional,
  IsString,
  IsUUID,
  MinLength,
} from 'class-validator';

export class PetsDto {
  @IsOptional()
  @IsUUID()
  id: string;

  @IsString()
  @MinLength(1)
  name: string;

  @IsString()
  @MinLength(1)
  lastname: string;

  @IsString({ each: true })
  @IsArray()
  colors: string[];

  @IsString()
  @IsIn(['Cat', 'Dog', 'Turtle', 'Rabbit', 'Horse', 'Dragon'])
  type: string;

  @IsUUID()
  @IsOptional()
  user?: string;
}
