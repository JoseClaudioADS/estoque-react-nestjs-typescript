import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Item from '../../entities/item.entity';
import { AddItemController } from './add/additem.controller';
import { AddItemService } from './add/additem.service';
import { IndexItemsController } from './index/indexItems.controller';
import { DestroyItemController } from './destroy/destroyItem.controller';
import { DestroyItemService } from './destroy/destroyItem.service';

@Module({
  imports: [TypeOrmModule.forFeature([Item])],
  controllers: [AddItemController, IndexItemsController, DestroyItemController],
  providers: [AddItemService, DestroyItemService],
})
export class ItemsModule {}
