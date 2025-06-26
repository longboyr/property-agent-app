// src/app.module.ts
import { Module } from '@nestjs/common';
import { PropertyAgentModule } from './property-agent/property-agent.module';
import { PropertyModule } from './property/property.module';
import { FamilyModule } from './family/family.module';
import { TenantModule } from './tenant/tenant.module';
import { NoteModule } from './note/note.module';

@Module({
  imports: [
    PropertyAgentModule,
    PropertyModule,
    FamilyModule,
    TenantModule,
    NoteModule,
  ],
})
export class AppModule {}
