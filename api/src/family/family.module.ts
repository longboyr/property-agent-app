import { Module, forwardRef } from '@nestjs/common';
import { FamilyService } from './family.service';
import { FamilyController } from './family.controller';
import { TenantModule } from '../tenant/tenant.module';
import { PropertyModule } from '../property/property.module';

@Module({
  imports: [forwardRef(() => TenantModule), forwardRef(() => PropertyModule)],
  controllers: [FamilyController],
  providers: [FamilyService],
  exports: [FamilyService],
})
export class FamilyModule {}
