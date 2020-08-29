import { Controller, Delete, Param } from '@nestjs/common';

import { DestroyItemService } from './destroyItem.service';

@Controller('items')
export class DestroyItemController {
  constructor(private readonly service: DestroyItemService) {}

  @Delete(':id')
  async handle(@Param('id') id): Promise<void> {
    await this.service.execute(id);
  }
}
