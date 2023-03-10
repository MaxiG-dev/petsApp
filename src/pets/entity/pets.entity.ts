import { Post } from 'src/posts/entity/post.entity';
import { Users } from 'src/users/entity/users.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Pets {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  name: string;

  @Column('text')
  lastname: string;

  @Column('simple-array')
  colors: string[];

  @Column('text')
  type: string;

  @Column('text', { nullable: true })
  @ManyToOne(() => Users, (user) => user.pets, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'user' })
  user?: string;

  @ManyToMany(() => Post, (post) => post.pets)
  posts?: string[];
}
