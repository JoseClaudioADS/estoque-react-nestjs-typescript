import {
  Controller,
  Post,
  Body,
  Res,
  HttpStatus,
  UseFilters,
} from '@nestjs/common';
import { Response } from 'express';
import * as Yup from 'yup';

import { SignUpService } from './signup.service';
import SignUpDTO from './signup.dto';

const schema = Yup.object().shape({
  name: Yup.string().required(),
  email: Yup.string().required().email(),
  password: Yup.string().required().min(6),
});

@Controller('users')
export class SignUpController {
  constructor(private readonly service: SignUpService) {}

  @Post()
  async handle(@Body() dto: SignUpDTO, @Res() res: Response): Promise<void> {
    await schema.validate(dto);
    await this.service.execute(dto);
    res.sendStatus(201);
  }
}
