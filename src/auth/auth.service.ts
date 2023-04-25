import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaDbService } from "src/prisma-db/prisma-db.service";
import { AuthDto } from "./dto";
import * as argon from "argon2";
import { Prisma } from "@prisma/client";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

@Injectable({})
export class AuthService {
    constructor(
        private prisma: PrismaDbService,
        private jwtService: JwtService,
        private configService: ConfigService
        ) { }

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

    async logIn(dto: AuthDto) {
        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email
            }
        })

        if (!user) {
            throw new ForbiddenException("Incorrect credentials")
        }

        const isPasswordMatch = await argon.verify(user.hashPassword, dto.password)
        if (!isPasswordMatch) {
            throw new ForbiddenException("Incorrect credentials")
        }

        return this.signToken(user.id, user.email)
    }

    async signToken(userId: number, email: string): Promise<{accessToken: string}>{
        const payload = {
            sub: userId,
            email 
        }
        const secret = this.configService.get('JWT_SECRET')
        const token =  await this.jwtService.signAsync(payload, {
            expiresIn: '15m',
            secret: secret
        })

        return { "accessToken" : token }
    }
}