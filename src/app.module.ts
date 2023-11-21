import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from 'config/database.config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from '@src/user/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlanModule } from './plan/plan.module';
import { PlanModule } from './plan/plan.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `./config/.env.${process.env.NODE_ENV}`,
      isGlobal: true,
      cache: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: databaseConfig,
      inject: [ConfigService],
    }),
    UserModule,
    PlanModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
