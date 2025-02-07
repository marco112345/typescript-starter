import { Injectable } from "@nestjs/common";

@Injectable({})
export class AuthService {

    //Now we are going to add some functionality to the class with login() and signup()
        
    
    signup(){
            return "I am signed up!!!!";
        }
    
        signuin(){
            return "I am signed in!!!!";
        }

}
