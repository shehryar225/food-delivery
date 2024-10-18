import { Test, TestingModule } from '@nestjs/testing';
import { MenugroupService } from './menugroup.service';

describe('MenugroupService', () => {
  let service: MenugroupService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MenugroupService],
    }).compile();

    service = module.get<MenugroupService>(MenugroupService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
