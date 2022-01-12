import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { UserDto } from './user.dto';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly config: ConfigService,
  ) {}

  async findByEmail(email: string): Promise<UserEntity | undefined> {
    return await this.userRepository.findOne({ where: { email } });
  }

  async findOne(id: number): Promise<UserEntity | undefined> {
    return await this.userRepository.findOne({ where: { id } });
  }

  async createUser(user: UserDto) {
    try {
      if (user.email && user.password) {
        user.password = await bcrypt.hash(
          user.password,
          this.config.get('crypto.rounds'),
        );
        const createdUser = await this.userRepository.save(user);
        const { password, ...result } = createdUser;
        return result;
      }
    } catch (e) {
      throw new BadRequestException('Error', e.message);
    }
  }
}
