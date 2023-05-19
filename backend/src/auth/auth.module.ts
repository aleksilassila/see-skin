import { Module } from "@nestjs/common";
import { LocalStrategy } from "./local.strategy";
import { AuthController } from "./auth.controller";
import { PassportModule } from "@nestjs/passport";
import { SerializerService } from "./serializer.service";
import { PrismaService } from "../prisma/prisma.service";
import { GoogleStrategy } from "./google.strategy";

@Module({
  providers: [LocalStrategy, SerializerService, PrismaService, GoogleStrategy],
  imports: [PassportModule.register({ session: true })],
  controllers: [AuthController],
})
export class AuthModule {}
