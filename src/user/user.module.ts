import { Module } from '@nestjs/common';
import { UserRepository } from '@src/user/user.repository';
import { AuthModule } from '@src/auth/auth.module';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  imports: [AuthModule],
  controllers: [UserController],
  providers: [UserService, UserRepository],
})
export class UserModule {}
