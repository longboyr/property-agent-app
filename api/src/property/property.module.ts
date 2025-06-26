import { Module, forwardRef } from '@nestjs/common';
import { PropertyService } from './property.service';
import { PropertyController } from './property.controller';
import { PropertyAgentModule } from '../property-agent/property-agent.module';
import { FamilyModule } from '../family/family.module';

@Module({
  imports: [
    forwardRef(() => PropertyAgentModule),
    forwardRef(() => FamilyModule),
  ],
  controllers: [PropertyController],
  providers: [PropertyService],
  exports: [PropertyService],
})
export class PropertyModule {}
