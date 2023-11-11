import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { DataSource, Repository } from 'typeorm';
import { UserRepository } from '@src/user/repository/user.repository';

@Injectable()
export class AuthRepository {
  private authRepository: AuthRepository;
  constructor(private readonly userRepository: UserRepository) {}

  async getExpFrom() {
    this.userRepository
  }
}
