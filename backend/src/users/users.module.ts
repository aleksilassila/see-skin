import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { PrismaModule } from "../prisma/prisma.module";
import { UsersService } from "./users.service";

@Module({
  controllers: [UsersController],
  imports: [PrismaModule],
  providers: [UsersService],
})
export class UsersModule {}
