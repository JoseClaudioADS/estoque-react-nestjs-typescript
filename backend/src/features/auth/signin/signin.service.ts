import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import User from '../../../entities/user.entity';
import SignInDTO from './signin.dto';

@Injectable()
export class SignInService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async execute(dto: SignInDTO): Promise<string> {
    const userDb = await this.usersRepository.findOne({
      email: dto.email,
    });

    if (!userDb || !(await bcrypt.compare(dto.password, userDb.password))) {
      throw new UnauthorizedException();
    }

    const payload = { email: userDb.email, sub: userDb.id };
    return this.jwtService.sign(payload);
  }
}
