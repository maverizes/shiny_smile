// import { Module } from '@nestjs/common';
// import { JwtModule } from '@nestjs/jwt';
// import { AuthService } from './auth.service';
// import { AuthController } from './auth.controller';
// import { CustomerModule } from '../customers/customers.module'; 

// @Module({
//     imports: [
//         CustomerModule, 
//         JwtModule.register({
//             secret: 'your-secret-key',
//             signOptions: { expiresIn: '1h' },
//         }),
//     ],
//     providers: [AuthService],
//     controllers: [AuthController],
// })
// export class AuthModule {}
