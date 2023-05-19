import { Controller, UseGuards, Post, Get, Req, Res } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { LocalAuthGuard } from "./guards/local-auth.guard";
import { IsAuthenticatedGuard } from "./guards/is-authenticated.guard";
import { Response, Request } from "express";

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
  async googleAuthCallback(@Req() req: Request, @Res() res: Response) {
    req.login(req.user, (err) => {
      res.redirect("/");
    });
  }

  @Get("logout")
  async logout(@Req() req: Request, @Res() res: Response) {
    req.logout((err) => {});
    res.redirect("/");
  }

  @UseGuards(IsAuthenticatedGuard)
  @Get("test")
  async test() {
    return "test";
  }
}
