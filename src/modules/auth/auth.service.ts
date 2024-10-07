import { Injectable, UnauthorizedException } from "@nestjs/common";
import { CustomerService } from "../customers/customers.service";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
    constructor(
        private customerService: CustomerService,
        private jwtService: JwtService,
    ) { }

    async validateCustomer(phone: string, password: string) {
        const customer = await this.customerService.findbyPhone(phone);
        if (customer && bcrypt.compareSync(password, (customer as any).password)) {
            const { password, ...result } = customer;
            return result;
        }
        throw new UnauthorizedException('Invalid credentials');
    }

    async login(phone: string, password: string) {
        const customer = await this.validateCustomer(phone, password);
        const payload = { phone: customer.phone, sub: customer.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    // Verify JWT token
    async verifyToken(token: string) {
        try {
            return this.jwtService.verify(token, { secret: 'your-secret-key' });
        } catch (e) {
            throw new UnauthorizedException('Invalid token');
        }
    }
}
