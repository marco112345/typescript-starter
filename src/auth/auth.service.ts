import { Injectable } from "@nestjs/common";
import {User, Bookmark} from '@prisma/client'
import { PrismaService } from "src/prisma/prisma.service";

@Injectable({})
export class AuthService {
    constructor(private prisma: PrismaService){

    }

    //Now we are going to add some functionality to the class with login() and signup()
        
    
    signup(){
            return "I am signed up!!!!";
        }
    
    signin(){
        return "I am signed in!!!!";
    }

}
