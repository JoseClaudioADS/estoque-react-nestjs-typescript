import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import User from '../../../entities/user.entity';
import SignUpDTO from './signup.dto';
import BusinessException from '../../../common/exceptions/business.exception';

@Injectable()
export class SignUpService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async execute(dto: SignUpDTO): Promise<void> {
    const user = this.usersRepository.create(dto);

    const countByEmail = await this.usersRepository.count({
      email: user.email,
    });

    if (countByEmail > 0) {
      throw new BusinessException('Email already used');
    }

    user.password = await bcrypt.hash(user.password, 5);
    await this.usersRepository.save(user);
  }
}
