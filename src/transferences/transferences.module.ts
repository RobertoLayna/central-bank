import { Module } from '@nestjs/common';
import { TransferencesService } from './transferences.service';
import { TransferencesController } from './transferences.controller';
import { Transference } from './entities/transference.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from 'src/accounts/entities/account.entity';
import { Card } from 'src/accounts/entities/card.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Transference, Account, Card])],
  controllers: [TransferencesController],
  providers: [TransferencesService]
})
export class TransferencesModule { }
