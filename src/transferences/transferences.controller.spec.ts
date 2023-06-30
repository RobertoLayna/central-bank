import { Test, TestingModule } from '@nestjs/testing';
import { TransferencesController } from './transferences.controller';
import { TransferencesService } from './transferences.service';

describe('TransferencesController', () => {
  let controller: TransferencesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransferencesController],
      providers: [TransferencesService],
    }).compile();

    controller = module.get<TransferencesController>(TransferencesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
