// import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
// import { AuthService } from '../modules/auth/auth.service';

// @Injectable()
// export class JwtGuard implements CanActivate {
//     constructor(private authService: AuthService) {}

//     async canActivate(context: ExecutionContext): Promise<boolean> {
//         const request = context.switchToHttp().getRequest();
//         const authHeader = request.headers['authorization'];

//         if (!authHeader || !authHeader.startsWith('Bearer ')) {
//             throw new UnauthorizedException('Token not provided');
//         }

//         const token = authHeader.split(' ')[1];
//         try {
//             const decoded = await this.authService.verifyToken(token);
//             request.user = decoded; 
//             return true;
//         } catch (err) {
//             throw new UnauthorizedException('Invalid token');
//         }
//     }
// }
