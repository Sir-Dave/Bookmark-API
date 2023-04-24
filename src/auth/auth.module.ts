import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { PrismaDbModule } from "src/prisma-db/prisma-db.module";

@Module({
    controllers: [AuthController],
    providers: [AuthService]
})
export class AuthModule{

}