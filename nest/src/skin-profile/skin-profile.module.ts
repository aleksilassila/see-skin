import { Module } from '@nestjs/common';
import { SkinProfileController } from './skin-profile.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [SkinProfileController],
  imports: [PrismaModule],
})
export class SkinProfileModule {}
