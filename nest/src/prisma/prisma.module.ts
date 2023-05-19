import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { ProductsService } from './products.service';
import { IngredientsService } from './ingredients.service';
import { PrismaService } from './prisma.service';

@Module({
  providers: [UsersService, ProductsService, IngredientsService, PrismaService],
  exports: [UsersService, ProductsService, IngredientsService, PrismaService],
})
export class PrismaModule {}
