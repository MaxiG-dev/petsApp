import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pets } from 'src/pets/entity/pets.entity';
import { Post } from 'src/posts/entity/post.entity';
import { Users } from 'src/users/entity/users.entity';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'mysql',
        host: process.env.HOST_DB,
        port: +process.env.PORT_DB,
        username: process.env.USERNAME_DB,
        password: process.env.PASSWORD_DB,
        database: process.env.DATABASE,
        entities: [Pets, Post, Users],
        synchronize: true,
        keepConnectionAlive: true,
        retryAttempts: 3,
        retryDelay: 1000,
        insecureAuth: true,
      }),
    }),
  ],
})
export class DatabaseModule {}
