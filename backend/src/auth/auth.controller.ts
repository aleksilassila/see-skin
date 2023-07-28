import {
  Controller,
  Get,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Request, Response } from "express";
import { LocalAuthGuard } from "./guards/local-auth.guard";

@Controller("auth")
export class AuthController {
  @UseGuards(LocalAuthGuard)
  @Post("local")
  async loginLocal(@Req() req: Request) {
    return req.user;
  }

  @UseGuards(AuthGuard("google"))
  @Get("google")
  async loginGoogle(@Req() req: Request) {
    return req.user;
  }

  @UseGuards(AuthGuard("google"))
  @Get("google/callback")
  async googleAuthCallback(
    @Req() req: Request,
    @Res() res: Response,
    @Query("state") returnUrl: string,
  ) {
    req.login(req.user, (err) => {
      res.redirect(returnUrl || "/");
    });
  }

  @Get("logout")
  async logout(@Req() req: Request, @Res() res: Response) {
    req.logout((err) => {});
    res.redirect("/");
  }
}
