import { Module } from '@nestjs/common';
import { TenantService } from './tenant.service';
import { TenantController } from './tenant.controller';

@Module({
  controllers: [TenantController],
  providers: [TenantService],
  exports: [TenantService], // Make sure TenantService is exported
})
export class TenantModule {}
