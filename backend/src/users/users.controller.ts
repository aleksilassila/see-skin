import { Body, Controller, Delete, Get, Put, UseGuards } from "@nestjs/common";
import { UsersService } from "../prisma/users.service";
import { IsAuthenticatedGuard } from "../auth/guards/is-authenticated.guard";
import { GetOptionalUser, GetUser } from "../auth/user.decorator";
import { User } from "@prisma/client";
import { UpdateUserDto } from "./dto/update-user.dto";

@Controller("user")
@UseGuards(IsAuthenticatedGuard)
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  async getUser(@GetUser() user: User) {
    return await this.userService.getUser(user.id);
  }

  @Put()
  async updateUser(
    @GetUser() user: User,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.userService.updateUser(user.id, updateUserDto);
  }

  @Delete()
  async deleteUser(@GetUser() user: User) {
    return await this.userService.deleteUser(user.id);
  }
}
