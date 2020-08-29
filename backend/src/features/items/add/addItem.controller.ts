import { Controller, Post, Body, Res } from '@nestjs/common';
import { Response } from 'express';
import * as Yup from 'yup';

import { AddItemService } from './additem.service';
import AddItemDTO from './additem.dto';

const schema = Yup.object().shape({
  name: Yup.string().required(),
  expirationDate: Yup.date().required(),
});

@Controller('items')
export class AddItemController {
  constructor(private readonly service: AddItemService) {}

  @Post()
  async handle(@Body() dto: AddItemDTO, @Res() res: Response): Promise<void> {
    await schema.validate(dto);
    await this.service.execute(dto);
    res.sendStatus(201);
  }
}
