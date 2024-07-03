import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { BanksModule } from './banks/banks.module';
import { TransferencesModule } from './transferences/transferences.module';
import { AccountsModule } from './accounts/accounts.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Bank } from './banks/entities/bank.entity';
import { User } from './users/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
import { Account } from './accounts/entities/account.entity';
import { Card } from './accounts/entities/card.entity';
import { Transference } from './transferences/entities/transference.entity';

const Database: TypeOrmModuleOptions = {
  type: 'postgres', host: 'ep-steep-hall-a4r83u54.us-east-1.aws.neon.tech',
  port: 5432,
  username: 'default',
  password: 'W7HbQwVtUi6M',
  database: 'verceldb',
  synchronize: true,
  entities: [Bank, User, Account, Card, Transference],
};
@Module({
  imports: [
    TypeOrmModule.forRoot(Database),
    UsersModule,
    BanksModule,
    TransferencesModule,
    AccountsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule { }
