import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Item from '../../entities/item.entity';
import { AddItemController } from './add/additem.controller';
import { AddItemService } from './add/additem.service';
import { IndexItemsController } from './index/indexItems.controller';
import { DestroyItemController } from './destroy/destroyItem.controller';
import { DestroyItemService } from './destroy/destroyItem.service';
import { ShowItemController } from './show/showItem.controller';
import { ShowItemService } from './show/showItem.service';
import { UpdateItemService } from './update/updateItem.service';
import { UpdateItemController } from './update/updateItem.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Item])],
  controllers: [
    AddItemController,
    IndexItemsController,
    DestroyItemController,
    ShowItemController,
    UpdateItemController,
  ],
  providers: [
    AddItemService,
    DestroyItemService,
    ShowItemService,
    UpdateItemService,
  ],
})
export class ItemsModule {}
