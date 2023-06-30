import { Test, TestingModule } from '@nestjs/testing';
import { TransferencesService } from './transferences.service';

describe('TransferencesService', () => {
  let service: TransferencesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TransferencesService],
    }).compile();

    service = module.get<TransferencesService>(TransferencesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
