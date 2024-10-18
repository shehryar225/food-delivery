import { Test, TestingModule } from '@nestjs/testing';
import { MenuitemsController } from './menuitems.controller';
import { MenuitemsService } from './menuitems.service';

describe('MenuitemsController', () => {
  let controller: MenuitemsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MenuitemsController],
      providers: [MenuitemsService],
    }).compile();

    controller = module.get<MenuitemsController>(MenuitemsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
