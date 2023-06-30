import { Module } from '@nestjs/common';
import { TransferencesService } from './transferences.service';
import { TransferencesController } from './transferences.controller';

@Module({
  controllers: [TransferencesController],
  providers: [TransferencesService]
})
export class TransferencesModule {}
