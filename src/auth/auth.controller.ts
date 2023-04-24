import { Controller, Get, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController{
    constructor(private authService: AuthService){}

    @Post("signup")
    signup(){
        return this.authService.signUp()
    }

    @Get("signin")
    login(){
        return this.authService.logIn()
    }

}