import { Test, TestingModule } from '@nestjs/testing';
import { MenuitemsService } from './menuitems.service';

describe('MenuitemsService', () => {
  let service: MenuitemsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MenuitemsService],
    }).compile();

    service = module.get<MenuitemsService>(MenuitemsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
