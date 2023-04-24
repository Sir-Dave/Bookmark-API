import { Injectable } from "@nestjs/common"; 
import { PrismaDbService } from "src/prisma-db/prisma-db.service";

@Injectable({})
export class AuthService{
    constructor(private prisma: PrismaDbService){}

    signUp(){
        return {
            "message": "Sign up endpoint"
        }
    }

    logIn(){
        return {
            "message": "Sign in endpoint"
        }
    }
}