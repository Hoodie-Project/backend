import { Module } from '@nestjs/common';
import { UserService } from '@src/user/user.service';
import { UserController } from '@src/user/user.controller';
import { UserRepository } from '@src/user/repository/user.repository';
import { AuthModule } from '@src/auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [UserController],
  providers: [UserService, UserRepository],
})
export class UserModule {}
