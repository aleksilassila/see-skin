import {
  Controller,
  UseGuards,
  Post,
  Request,
  Get,
  Req,
  Res,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { IsAuthenticatedGuard } from './guards/is-authenticated.guard';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  @UseGuards(LocalAuthGuard)
  @Post('local')
  async loginLocal(@Request() req) {
    return req.user;
  }

  @UseGuards(AuthGuard('google'))
  @Get('google')
  async loginGoogle(@Request() req) {
    return req.user;
  }

  @UseGuards(AuthGuard('google'))
  @Get('google/callback')
  async googleAuthCallback(@Req() req, @Res() res: Response) {
    req.login(req.user, (err) => {
      res.redirect('/api/auth/test?fail=true');
    });
  }

  @UseGuards(IsAuthenticatedGuard)
  @Get('test')
  async test() {
    return 'test';
  }
}
