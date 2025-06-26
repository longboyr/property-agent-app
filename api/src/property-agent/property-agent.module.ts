import { Module, forwardRef } from '@nestjs/common';
import { PropertyAgentService } from './property-agent.service';
import { PropertyAgentController } from './property-agent.controller';
import { PropertyModule } from '../property/property.module';

@Module({
  imports: [forwardRef(() => PropertyModule)],
  controllers: [PropertyAgentController],
  providers: [PropertyAgentService],
  exports: [PropertyAgentService],
})
export class PropertyAgentModule {}
