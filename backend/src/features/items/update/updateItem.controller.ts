import { Controller, Param, Put, Body } from '@nestjs/common';

import { UpdateItemService } from './updateItem.service';
import UpdateItemDTO from './updateItem.dto';
import * as Yup from 'yup';

const schema = Yup.object().shape({
  name: Yup.string().required(),
  expirationDate: Yup.date().required(),
});

@Controller('items')
export class UpdateItemController {
  constructor(private readonly service: UpdateItemService) {}

  @Put(':id')
  async handle(@Param('id') id, @Body() dto: UpdateItemDTO): Promise<void> {
    await schema.validate(dto);
    await this.service.execute(id, dto);
  }
}
