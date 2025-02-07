import { Body, Controller, Post} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto";

@Controller('auth')
export class AuthController{
    //To avoid, instaciate the AuthService class
    //we just goes like this:
    constructor(private authService: AuthService) {}
    //This is dependency injection, now the controller can user the business logic of the class

    //Now we create some endpoints

    //using @Post decorator

    @Post('signup')
    //dto has been validated
    signup(@Body() dto: AuthDto){
        //console.log({dto})
        return this.authService.signup(dto);
    }

    @Post('signin')
    signuin(){
        return this.authService.signin();
    }
}
