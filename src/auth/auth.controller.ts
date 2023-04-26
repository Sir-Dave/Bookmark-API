import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Request } from "express";
import { AuthDto } from "./dto";

@Controller("auth")
export class AuthController{
    constructor(private authService: AuthService){}

    @Post("signup")
    signup(@Body() dto: AuthDto){
        return this.authService.signUp(dto)
    }

    @HttpCode(HttpStatus.OK)
    @Post("signin")
    login(@Body() dto: AuthDto){
        return this.authService.logIn(dto)
    }

}