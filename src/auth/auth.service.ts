import { ForbiddenException, Injectable } from "@nestjs/common";
import {User, Bookmark} from '@prisma/client'
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";
import * as argon from 'argon2'
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { JwtService } from "@nestjs/jwt";

@Injectable({})
export class AuthService {
    //Prisma inyection to AuthService
    constructor(
        private prisma: PrismaService,
        private jwt: JwtService,
    ){}
    //Now we are going to add some functionality to the class with login() and signup()
    async signup(dto: AuthDto){
        //Generate the password hash

        try {

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
            
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError){
                //P2002: user tries to create a record that exists already
                if (error.code === 'P2002'){
                    throw new ForbiddenException('Credentials taken')
                }



            }

            throw error;
        }
 
    }
    
    async signin(dto: AuthDto){

        //find the user by email
        const user = 
            await this.prisma.user.findFirst({
                where: {
                    email: dto.email,
                },
            });

        //if user does not exist throw exception
        if (!user)
            throw new ForbiddenException(
                "Credentials incorrect"
            );

        //compare password

        const pwMatches = await argon.verify(

            user.hash,
            dto.password
        );

        //if password incorrect throw exception
        if (!pwMatches)
            throw new ForbiddenException(
                "Credentials incorrect"
            );

        //send back the user
        delete user.hash;
        return user;
    }

}
