import { Module } from '@nestjs/common';
import { PropertyAgentService } from './property-agent.service';
import { PropertyAgentController } from './property-agent.controller';

@Module({
  controllers: [PropertyAgentController],
  providers: [PropertyAgentService],
})
export class PropertyAgentModule {}
