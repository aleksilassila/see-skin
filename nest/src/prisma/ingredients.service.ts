import { PrismaService } from './prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class IngredientsService {
  constructor(private readonly prisma: PrismaService) {}
}
