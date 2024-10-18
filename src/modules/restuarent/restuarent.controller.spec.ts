import { Test, TestingModule } from '@nestjs/testing';
import { RestuarentController } from './restuarent.controller';
import { RestuarentService } from './restuarent.service';

describe('RestuarentController', () => {
  let controller: RestuarentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RestuarentController],
      providers: [RestuarentService],
    }).compile();

    controller = module.get<RestuarentController>(RestuarentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
