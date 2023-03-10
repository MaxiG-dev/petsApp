import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseModule } from './common/database/database.module';
import { PetsModule } from './pets/pets.module';
import { PostsModule } from './posts/posts.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    PetsModule,
    PostsModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
