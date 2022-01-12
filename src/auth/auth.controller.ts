import { Controller, Get, Post, UseGuards, Req, Body } from '@nestjs/common';
import { UserDto } from '../users/user.dto';
import { UserService } from '../users/user.service';
import { LocalAuthGuard } from '../guard/local.guard';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from '../guard/jwt.guard';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}
  @ApiBody({
    schema: { example: { email: 'example@mail.ru', password: 'qwerty' } },
  })
  @Post('create')
  async create(@Body() payload: UserDto) {
    const user = new UserDto(payload);
    const newUser = await this.userService.createUser(user);
    return await this.authService.login(newUser);
  }

  @UseGuards(LocalAuthGuard)
  @ApiBody({
    schema: { example: { email: 'example@mail.ru', password: 'qwerty' } },
  })
  @Post('login')
  async login(@Req() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('profile')
  async getProfile(@Req() req) {
    return req.user;
  }
}
