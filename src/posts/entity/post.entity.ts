import { Pets } from 'src/pets/entity/pets.entity';
import { Users } from 'src/users/entity/users.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  title: string;

  @Column('text', { nullable: true })
  description: string;

  @Column('simple-array', { nullable: true })
  imagesUrls?: string[];

  @ManyToMany(() => Users, (user) => user.posts, { cascade: true })
  @JoinTable()
  users?: string[];

  @ManyToMany(() => Pets, (pet) => pet.posts, { cascade: true })
  @JoinTable()
  pets?: string[];
}
