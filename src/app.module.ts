import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaDbModule } from './prisma-db/prisma-db.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    AuthModule, 
    PrismaDbModule, 
    ConfigModule.forRoot({
      isGlobal: true
    })],
})
export class AppModule {}
