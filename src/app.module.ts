import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaDbModule } from './prisma-db/prisma-db.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    AuthModule, 
    PrismaDbModule, 
    ConfigModule.forRoot({
      isGlobal: true
    }), UserModule],
})
export class AppModule {}
