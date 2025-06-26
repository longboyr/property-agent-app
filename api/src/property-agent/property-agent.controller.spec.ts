import { Test, TestingModule } from '@nestjs/testing';
import { PropertyAgentController } from './property-agent.controller';
import { PropertyAgentService } from './property-agent.service';

describe('PropertyAgentController', () => {
  let controller: PropertyAgentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PropertyAgentController],
      providers: [PropertyAgentService],
    }).compile();

    controller = module.get<PropertyAgentController>(PropertyAgentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
