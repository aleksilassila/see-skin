import { PassportStrategy } from "@nestjs/passport";
import { Strategy, VerifyCallback } from "passport-google-oauth20";
import { ENDPOINT, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from "../constants";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, "google") {
  constructor(private prismaService: PrismaService) {
    super({
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: ENDPOINT + "/api/auth/google/callback",
      scope: ["email", "profile"],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    return await this.prismaService.user
      .upsert({
        where: {
          googleId: profile.id,
        },
        update: {},
        create: {
          googleId: profile.id,
          name: profile.displayName,
          email: profile.emails?.[0].value || "",
        },
      })
      .then((user) => done(null, user || false))
      .catch((err) => done(err));
  }
}
