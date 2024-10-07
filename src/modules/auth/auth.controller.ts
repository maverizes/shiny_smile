import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('login')
    async login(@Body() body: { phone: string; password: string }) {
        const { phone, password } = body;
        return this.authService.login(phone, password);
    }

    @Post('verify-token')
    async verifyToken(@Body() body: { token: string }) {
        const { token } = body;
        return this.authService.verifyToken(token);
    }
}
