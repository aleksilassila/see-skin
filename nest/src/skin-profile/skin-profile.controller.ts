import { Controller, Delete, Get, Post, Put, UseGuards } from '@nestjs/common';
import { GetUser } from '../auth/user.decorator';
import { User } from '@prisma/client';
import { UsersService } from '../prisma/users.service';
import { IsAuthenticatedGuard } from '../auth/guards/is-authenticated.guard';

@Controller('skin-profile')
@UseGuards(IsAuthenticatedGuard)
export class SkinProfileController {
  constructor(private usersService: UsersService) {}

  @Get()
  getSkinProfile(@GetUser() user: User) {
    return this.usersService
      .getUserWithSkinProfile(user.id)
      .then((user) => user.skinProfile);
  }

  @Post()
  updateSkinProfile(@GetUser() user: User) {}

  @Delete()
  deleteSkinProfile(@GetUser() user: User) {}

  @Put()
  setSkinProfile(@GetUser() user: User) {}
}
