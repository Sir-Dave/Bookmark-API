import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaDbService } from "src/prisma-db/prisma-db.service";
import { AuthDto } from "./dto";
import * as argon from "argon2";
import { Prisma } from "@prisma/client";

@Injectable({})
export class AuthService {
    constructor(private prisma: PrismaDbService) { }

    async signUp(dto: AuthDto) {
        try {
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

        catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ForbiddenException("Credentials already taken")
                }
            }

            throw error
        }
    }

    logIn() {
        return {
            "message": "Sign in endpoint"
        }
    }
}