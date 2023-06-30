import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Account } from 'src/accounts/entities/account.entity';
import { AccountsService } from 'src/accounts/accounts.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Account]), AccountsService],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
