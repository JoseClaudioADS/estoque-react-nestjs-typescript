import { Module } from '@nestjs/common';
import { SignUpController } from './signup/signup.controller';
import { SignUpService } from './signup/signup.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from '../../entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [SignUpController],
  providers: [SignUpService],
  exports: [TypeOrmModule.forFeature([User])],
})
export class UsersModule {}
