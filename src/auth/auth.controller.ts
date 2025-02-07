import { Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthController{
    //To avoid, instaciate the AuthService class
    //we just goes like this:
    constructor(private authService: AuthService) {}
    //This is dependency injection, now the controller can user the business logic of the class

    //Now we create some endpoints

    //using @Post decorator

    @Post('signup')
    signup(){
        return this.authService.signup();
    }

    @Post('signin')
    signuin(){
        return this.authService.signuin();
    }
}
