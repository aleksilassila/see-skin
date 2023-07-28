import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { PrismaService } from "../prisma/prisma.service";
import { NODE_ENV } from "../constants";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private prismaService: PrismaService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    if (NODE_ENV !== "development") {
      return false;
    }

    console.log("HEre");

    return await this.prismaService.user.upsert({
      where: { id: "test" },
      update: {},
      create: {
        id: "test",
        name: "test",
        password: "test",
        email: "test@gmail.com",
      },
    });
  }
}
