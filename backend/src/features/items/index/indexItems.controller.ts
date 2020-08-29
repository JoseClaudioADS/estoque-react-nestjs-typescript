import { Controller, Get } from '@nestjs/common';

import Item from '../../../entities/item.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

interface ItemsResponse {
  items: Array<Item>;
}

@Controller('items')
export class IndexItemsController {
  constructor(
    @InjectRepository(Item)
    private itemsRepository: Repository<Item>,
  ) {}

  @Get()
  async handle(): Promise<ItemsResponse> {
    return {
      items: await this.itemsRepository.find(),
    };
  }
}
