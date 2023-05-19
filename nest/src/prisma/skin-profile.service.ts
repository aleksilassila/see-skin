import { Injectable } from '@nestjs/common';
import { UsersService } from './users.service';

@Injectable()
export class SkinProfileService {
  constructor(private usersService: UsersService) {}
}
