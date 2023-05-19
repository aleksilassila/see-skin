import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [ProductsController],
  imports: [PrismaModule],
})
export class ProductsModule {}
