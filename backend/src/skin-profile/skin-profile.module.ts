import { Module } from "@nestjs/common";
import { SkinProfileController } from "./skin-profile.controller";
import { PrismaModule } from "../prisma/prisma.module";
import { SkinClassService } from "./skin-class.service";
import { SkinProfileService } from "./skin-profile.service";

@Module({
  controllers: [SkinProfileController],
  imports: [PrismaModule],
  exports: [SkinProfileService],
  providers: [SkinClassService, SkinProfileService],
})
export class SkinProfileModule {}
