import { Test, TestingModule } from '@nestjs/testing';
import { MenugroupController } from './menugroup.controller';
import { MenugroupService } from './menugroup.service';

describe('MenugroupController', () => {
  let controller: MenugroupController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MenugroupController],
      providers: [MenugroupService],
    }).compile();

    controller = module.get<MenugroupController>(MenugroupController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
