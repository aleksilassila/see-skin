import { PassportSerializer } from '@nestjs/passport';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SerializerService extends PassportSerializer {
  constructor(private prismaService: PrismaService) {
    super();
  }

  serializeUser(user: User, done: CallableFunction): any {
    console.log('serializeUser', user);
    done(null, user.id);
  }

  async deserializeUser(userId: string, done: CallableFunction) {
    return await this.prismaService.user
      .findUniqueOrThrow({
        where: { id: userId },
      })
      .then((user) => done(null, user))
      .catch((err) => done(err));
  }
}
