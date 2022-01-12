import { Controller, UseGuards } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';

import { ProductsEntity } from '../entities/products.entity';
import { ProductsService } from './products.service';
import { JwtAuthGuard } from '../guard/jwt.guard';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@Crud({
  model: {
    type: ProductsEntity,
  },
  routes: {
    createOneBase: {
      decorators: [UseGuards(JwtAuthGuard), ApiBearerAuth()],
    },
    updateOneBase: {
      decorators: [UseGuards(JwtAuthGuard), ApiBearerAuth()],
    },
  },
  query: {
    cache: 60000,
    alwaysPaginate: true,
  },
})
@ApiTags('Products')
@Controller('products')
export class ProductsController implements CrudController<ProductsEntity> {
  constructor(public service: ProductsService) {}
}
