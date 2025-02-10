import { Test, TestingModule } from '@nestjs/testing';
import { BillingServiceController } from './billing-service.controller';
import { BillingServiceService } from './billing-service.service';

describe('BillingServiceController', () => {
  let controller: BillingServiceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BillingServiceController],
      providers: [BillingServiceService],
    }).compile();

    controller = module.get<BillingServiceController>(BillingServiceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
