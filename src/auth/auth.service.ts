import { Injectable } from "@nestjs/common";
import {User, Bookmark} from '@prisma/client'
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";
import * as argon from 'argon2'

@Injectable({})
export class AuthService {
    //Prisma inyection to AuthService
    constructor(private prisma: PrismaService){
    }
    //Now we are going to add some functionality to the class with login() and signup()
    async signup(dto: AuthDto){
        //Generate the password hash
        const hash = await argon.hash(dto.password);

        //Save the new user in the bd
        const user = await this.prisma.user.create({
            data: {
                email: dto.email,
                hash
            }
        })
        //Return the saved user
        delete user.hash;
        return user;
    }
    
    signin(){
        return "I am signed in!!!!";
    }

}
