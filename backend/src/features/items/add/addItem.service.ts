import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Item from '../../../entities/item.entity';
import AddItemDTO from './addItem.dto';

@Injectable()
export class AddItemService {
  constructor(
    @InjectRepository(Item)
    private itemsRepository: Repository<Item>,
  ) {}

  async execute(dto: AddItemDTO): Promise<void> {
    const item = this.itemsRepository.create(dto);
    await this.itemsRepository.save(item);
  }
}
