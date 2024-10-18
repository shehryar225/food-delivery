import { Test, TestingModule } from '@nestjs/testing';
import { RestuarentService } from './restuarent.service';

describe('RestuarentService', () => {
  let service: RestuarentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RestuarentService],
    }).compile();

    service = module.get<RestuarentService>(RestuarentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
