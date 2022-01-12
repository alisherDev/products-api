import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

import { ProductsEntity } from '../entities/products.entity';

@Injectable()
export class ProductsService extends TypeOrmCrudService<ProductsEntity> {
  constructor(@InjectRepository(ProductsEntity) productsRepository) {
    super(productsRepository);
  }
}
