import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Item from '../../../entities/item.entity';

@Injectable()
export class ShowItemService {
  constructor(
    @InjectRepository(Item)
    private itemsRepository: Repository<Item>,
  ) {}

  async execute(id: string): Promise<Item> {
    return await this.itemsRepository.findOne(id);
  }
}
