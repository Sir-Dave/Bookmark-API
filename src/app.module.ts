import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaDbModule } from './prisma-db/prisma-db.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { BookmarkModule } from './bookmark/bookmark.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),

    AuthModule, 
    PrismaDbModule, 
    UserModule, 
    BookmarkModule],
})
export class AppModule {}
