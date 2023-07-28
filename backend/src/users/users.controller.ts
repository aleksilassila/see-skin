import {
  Body,
  Controller,
  Delete,
  Get,
  Put,
  UseGuards,
  Req,
  Res,
} from "@nestjs/common";
import { UsersService } from "../prisma/users.service";
import { IsAuthenticatedGuard } from "../auth/guards/is-authenticated.guard";
import { GetUser } from "../auth/user.decorator";
import { User } from "@prisma/client";
import { UpdateUserDto } from "./dto/update-user.dto";
import { Request, Response } from "express";

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
  async deleteUser(
    @Req() req: Request,
    @Res() res: Response,
    @GetUser() user: User,
  ) {
    res.clearCookie("connect.sid");
    res.send(await this.userService.deleteUser(user.id));
  }
}
