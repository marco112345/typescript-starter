import { Controller } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller()
export class AuthController{
    //To avoid, instaciate the AuthService class
    //we just goes like this:
    constructor(private authService: AuthService) {}

    //This is dependency injection, now the controller can user the business logic of the class
}