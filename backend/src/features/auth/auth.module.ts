import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { SignInService } from './signin/signin.service';
import { SignInController } from './signin/signin.controller';
import { UsersModule } from '../users/users.module';
import { jwtConstants } from './constants';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [SignInController],
  providers: [SignInService],
})
export class AuthModule {}
