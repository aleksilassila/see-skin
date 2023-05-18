import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { NODE_ENV } from '../constants';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  async validate(username: string, password: string): Promise<any> {
    if (NODE_ENV !== 'development') {
      return false;
    }

    const user = {
      id: 'test',
      name: 'test',
    };

    if (!user) {
      return false;
    }

    return user;
  }
}
