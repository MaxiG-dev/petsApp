import {
  IsArray,
  IsOptional,
  IsString,
  IsUUID,
  Length,
  MinLength,
} from 'class-validator';

export class PostDto {
  id: number;

  @IsString()
  @MinLength(1)
  title: string;

  @IsString()
  @Length(1, 300)
  description: string;

  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  imagesUrls?: string[];

  @IsUUID('all', { each: true })
  @IsArray()
  @IsOptional()
  users?: string[];

  @IsUUID('all', { each: true })
  @IsArray()
  @IsOptional()
  pets?: string[];
}
