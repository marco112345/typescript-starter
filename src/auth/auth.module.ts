import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Module({
    controllers: [AuthModule],
    providers: [AuthService]
})
export class AuthModule{}