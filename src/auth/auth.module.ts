import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { PrismaDbModule } from "src/prisma-db/prisma-db.module";
import { JwtModule } from "@nestjs/jwt";

@Module({
    imports: [JwtModule.register({})],
    controllers: [AuthController],
    providers: [AuthService]
})
export class AuthModule{

}