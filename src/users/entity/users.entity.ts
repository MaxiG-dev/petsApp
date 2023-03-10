import { Pets } from 'src/pets/entity/pets.entity';
import { Post } from 'src/posts/entity/post.entity';
import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  name: string;

  @Column('text')
  lastname: string;

  @Column('text')
  email: string;

  @Column('text')
  password: string;

  @OneToMany(() => Pets, (pet) => pet.user)
  pets?: string[];

  @ManyToMany(() => Post, (post) => post.pets)
  posts?: string[];
}
