import { Injectable } from "@nestjs/common"; 
import { PrismaDbService } from "src/prisma-db/prisma-db.service";
import { AuthDto } from "./dto";
import * as argon from "argon2";

@Injectable({})
export class AuthService{
    constructor(private prisma: PrismaDbService){}

    async signUp(dto: AuthDto){
        const hash = await argon.hash(dto.password)
        const user = await this.prisma.user.create({
            data: {
                email: dto.email,
                hashPassword: hash
            }
        })
        delete user.hashPassword
        return user
    }

    logIn(){
        return {
            "message": "Sign in endpoint"
        }
    }
}