import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { CacheInterceptor, CacheKey } from '@nestjs/cache-manager';

@Controller('/user')
// @UseInterceptors(CacheInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('getAll')
  @CacheKey('users')
  @UseInterceptors(CacheInterceptor)
  async getUser(): Promise<any> {
    const users = await this.userService.get();
    return users;
  }
}
