import { Controller, Param, Get, NotFoundException } from '@nestjs/common';

import { ShowItemService } from './showItem.service';
import Item from '../../../entities/item.entity';

@Controller('items')
export class ShowItemController {
  constructor(private readonly service: ShowItemService) {}

  @Get(':id')
  async handle(@Param('id') id): Promise<Item> {
    const item = await this.service.execute(id);

    if (!item) {
      throw new NotFoundException();
    }

    return item;
  }
}
