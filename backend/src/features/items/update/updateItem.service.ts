import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Item from '../../../entities/item.entity';
import UpdateItemDTO from './updateItem.dto';

@Injectable()
export class UpdateItemService {
  constructor(
    @InjectRepository(Item)
    private itemsRepository: Repository<Item>,
  ) {}

  async execute(id: string, dto: UpdateItemDTO): Promise<void> {
    const itemDb = await this.itemsRepository.findOne(id);

    if (!itemDb) {
      throw new NotFoundException();
    }

    Object.assign(itemDb, dto);
    await this.itemsRepository.save(itemDb);
  }
}
