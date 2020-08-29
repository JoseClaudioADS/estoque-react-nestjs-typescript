import { Controller, Post, Body, Res } from '@nestjs/common';
import { Response } from 'express';
import * as Yup from 'yup';

import { SignInService } from './signin.service';
import SignInDTO from './signin.dto';

const schema = Yup.object().shape({
  email: Yup.string().required().email(),
  password: Yup.string().required().min(6),
});

@Controller('auth')
export class SignInController {
  constructor(private readonly service: SignInService) {}

  @Post('login')
  async handle(@Body() dto: SignInDTO, @Res() res: Response): Promise<void> {
    await schema.validate(dto);
    const token = await this.service.execute(dto);
    res.status(200).json({
      token,
    });
  }
}
